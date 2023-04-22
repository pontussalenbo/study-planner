using System.Text;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;

#pragma warning disable IDE1006

namespace StudyPlannerAPI.Model;

public class MasterRequirementValidator : IMasterRequirementValidator
{
    private readonly IDatabaseManager databaseManager;
    private readonly ILogger<MasterRequirementValidator> logger;

    public MasterRequirementValidator(IDatabaseManager databaseManager, ILogger<MasterRequirementValidator> logger)
    {
        this.databaseManager = databaseManager;
        this.logger = logger;
    }

    public async Task<IDictionary<string, MasterValidationResult>?> ValidateCourseSelection(string programme,
        string classYear, string academicYear, List<string> selectedCourses, List<string> masterCodes)
    {
        if (masterCodes.Count == 0) // if there are no provided master codes, compute for all
        {
            const string query = @"SELECT master_code FROM programme_master WHERE programme_code = @p0";
            var queryResult = await databaseManager.GetList<MasterCodeDTO>(query, programme);
            masterCodes = queryResult.Select(dto => dto.master_code).ToList();
        }

        if (!masterCodes.Contains("general"))
        {
            masterCodes.Add("general");
        }

        var result = new Dictionary<string, MasterValidationResult>();
        foreach (var masterCode in masterCodes)
        {
            logger.LogDebug("Validating req. for {master}", masterCode);
            var validationResult = await ValidateMaster(masterCode, classYear, academicYear, selectedCourses);
            result.Add(masterCode, validationResult);
        }

        return result;
    }

    private async Task<MasterValidationResult> ValidateMaster(string masterCode, string classYear, string academicYear,
        List<string> selectedCourses)
    {
        var parameters = new List<string>();
        var queryBuilder = new StringBuilder("SELECT DISTINCT(course_code), credits, level ");
        var condStmtBuilder = new StringBuilder();


        var condTable = classYear != string.Empty ? "course_class" : "course_year";
        var condColumn = classYear != string.Empty ? "class_year" : "academic_year";
        var parameter = classYear != string.Empty ? classYear : academicYear;
        queryBuilder.AppendLine($"FROM {condTable}");
        condStmtBuilder.AppendLine($"WHERE {condColumn} = @p{parameters.Count}");
        parameters.Add(parameter);

        queryBuilder.AppendLine("JOIN master_course USING(course_code) JOIN courses_info USING(course_code) ");
        condStmtBuilder.AppendLine($" AND master_code = @p{parameters.Count} AND (");
        parameters.Add(masterCode);

        foreach (var course in selectedCourses)
        {
            var op = parameters.Count == 2 /*is a magic number!*/ ? string.Empty : "OR";
            condStmtBuilder.Append($" {op} course_code = @p{parameters.Count}");
            parameters.Add(course);
        }

        condStmtBuilder.Append(')');

        queryBuilder.AppendLine(condStmtBuilder.ToString());
        var query = queryBuilder.ToString();
        var queryResult = await Task.Run(() => databaseManager.GetList<CourseInfoDTO>(query, parameters.ToArray()));

        var advancedCredits = queryResult.Where(c => c.level == Constants.A_CREDITS).Sum(c => c.credits);
        var g1Credits = queryResult.Where(c => c.level == Constants.G1_CREDITS).Sum(c => c.credits);
        var g2Credits = queryResult.Where(c => c.level == Constants.G2_CREDITS).Sum(c => c.credits);
        var totalCredits = queryResult.Sum(c => c.credits);
        var result = new MasterValidationResult
        {
            AdvancedCredits = advancedCredits,
            G1Credits = g1Credits,
            G2Credits = g2Credits,
            RequirementsFulfilled = masterCode != "general"
                ? advancedCredits >= 30 && totalCredits >= 45
                : advancedCredits >= 45 && totalCredits >= 90
        };
        return result;
    }


    internal class MasterCodeDTO
    {
        public string master_code { get; set; } = string.Empty;
    }
}