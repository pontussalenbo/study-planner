using System.Text;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using static StudyPlannerAPI.Database.Columns;
using static StudyPlannerAPI.Database.Tables;
using static StudyPlannerAPI.Constants;
using static StudyPlannerAPI.Database.DatabaseUtil;

namespace StudyPlannerAPI.Model;

public class MasterRequirementValidator : IMasterRequirementValidator
{
    private readonly IDatabaseQueryManager databaseQueryManager;
    private readonly ILogger<MasterRequirementValidator> logger;

    public MasterRequirementValidator(IDatabaseQueryManager databaseQueryManager, IConfiguration configuration,
        ILogger<MasterRequirementValidator> logger)
    {
        this.databaseQueryManager =
            (IDatabaseQueryManager)ConfigureDatabaseManager(databaseQueryManager, configuration,
                CONNECTION_STRING);
        this.logger = logger;
    }

    public async Task<List<MasterValidationResult>> ValidateCourseSelection(string programme,
        string year, List<string> selectedCourses, List<string> masterCodes)
    {
        if (masterCodes.Count == 0) // if there are no provided master codes, compute for all
        {
            var table = ModelUtil.YearPatternToTable(year);
            var column = ModelUtil.YearPatternToColumn(year);
            var parameters = new List<string>
            {
                programme,
                year
            };
            var query =
                $"SELECT DISTINCT({MASTER_CODE}) FROM {table} JOIN {MASTERS} USING({MASTER_CODE}) WHERE {PROGRAMME_CODE} = {QueryParam(0)} AND {column} = {QueryParam(1)}";
            var queryResult = await databaseQueryManager.ExecuteQuery<MasterCodeDTO>(query, parameters.ToArray());
            masterCodes = queryResult.Select(dto => dto.master_code).ToList();
        }

        if (!masterCodes.Contains(GENERAL))
        {
            masterCodes.Add(GENERAL);
        }

        masterCodes.Add(SUMMARY);
        var result = new List<MasterValidationResult>();
        foreach (var masterCode in masterCodes)
        {
            var validationResult = await ValidateMaster(programme, masterCode, year, selectedCourses);
            result.Add(validationResult);
        }

        return result;
    }

    private async Task<MasterValidationResult> ValidateMaster(string programme, string masterCode, string year,
        List<string> selectedCourses)
    {
        var queryBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();
        var parameters = new List<string>
        {
            programme,
            year
        };

        queryBuilder.AppendLine(
            @$"SELECT DISTINCT({COURSE_CODE}), {CREDITS}, {LEVEL}
               FROM {PROGRAMME_MASTER_COURSE_CLASS} JOIN {COURSES} USING({COURSE_CODE})
               WHERE {PROGRAMME_CODE} = {QueryParam(0)} AND {CLASS_YEAR} = {QueryParam(1)}");

        if (masterCode == SUMMARY)
        {
            queryBuilder.AppendLine($"AND ({ELECTABILITY} = {QueryParam(2)} OR {ELECTABILITY} = {QueryParam(3)})");
            parameters.Add(ELECTIVE);
            parameters.Add(EXTERNAL_ELECTIVE);
        }
        else
        {
            queryBuilder.AppendLine($"AND {MASTER_CODE} = {QueryParam(parameters.Count)}");
            parameters.Add(masterCode);
        }

        condStmtBuilder.AppendLine(" AND (");
        foreach (var course in selectedCourses)
        {
            var op = course == selectedCourses.First() ? string.Empty : "OR";
            condStmtBuilder.Append($" {op} {COURSE_CODE} = {QueryParam(parameters.Count)}");
            parameters.Add(course);
        }

        condStmtBuilder.Append(')');

        queryBuilder.AppendLine(condStmtBuilder.ToString());
        var query = queryBuilder.ToString();
        var queryResult =
            await databaseQueryManager.ExecuteQuery<CourseDTO>(query, parameters.ToArray());

        var advancedCredits = queryResult.Where(c => c.level == A_CREDITS).Sum(c => c.credits);
        var g1Credits = queryResult.Where(c => c.level == G1_CREDITS).Sum(c => c.credits);
        var g2Credits = queryResult.Where(c => c.level == G2_CREDITS).Sum(c => c.credits);
        var totalCredits = queryResult.Sum(c => c.credits);
        var result = new MasterValidationResult
        {
            Master = masterCode,
            AdvancedCredits = advancedCredits,
            G1Credits = g1Credits,
            G2Credits = g2Credits,
            RequirementsFulfilled = masterCode != SUMMARY
                ? advancedCredits >= REQUIRED_A_CREDITS_MASTER
                  && totalCredits >= REQUIRED_CREDITS_MASTER
                : advancedCredits >= REQUIRED_A_CREDITS_TOTAL
                  && totalCredits >= REQUIRED_CREDITS_TOTAL
        };
        return result;
    }
}