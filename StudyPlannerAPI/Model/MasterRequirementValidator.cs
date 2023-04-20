using System.Text;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public class MasterRequirementValidator : IMasterRequirementValidator
{
    private readonly IDatabaseManager databaseManager;

    public MasterRequirementValidator(IDatabaseManager databaseManager)
    {
        this.databaseManager = databaseManager;
    }

    public async Task<IDictionary<string, MasterValidationResult>?> ValidateCourseSelection(string programme,
        string year, List<string> selectedCourses, List<string> masterCodes)
    {
        if (masterCodes.Count == 0) // if there are no provided master codes, compute for all
        {
            const string query = @"SELECT master_code FROM programme_master WHERE programme_code = @p0";
            var queryResult = await databaseManager.GetList<dynamic>(query, programme);
            masterCodes = (List<string>)queryResult;
        }

        if (!masterCodes.Contains("general"))
        {
            masterCodes.Add("general");
        }

        var result = new Dictionary<string, MasterValidationResult>();
        foreach (var masterCode in masterCodes)
        {
            var validationResult = await ValidateMaster(masterCode, year, selectedCourses);
            result.Add(masterCode, validationResult);
        }

        return result;
    }

    private async Task<MasterValidationResult> ValidateMaster(string masterCode, string year,
        List<string> selectedCourses)
    {
        var parameters = new List<string>();
        var queryBuilder = new StringBuilder();
        queryBuilder.Append(@"SELECT DISTINCT(course_code), credits, level
                                  FROM   course_class
                                  JOIN master_course USING(course_code)
                                  JOIN courses_info  USING(course_code)
                                  WHERE class = @p0
                                  AND master_code = @p1 AND (");
        parameters.Add(year);
        parameters.Add(masterCode);
        foreach (var course in selectedCourses)
        {
            var op = parameters.Count == 2 /*is a magic number!*/ ? string.Empty : "OR";
            queryBuilder.Append($" \n{op} course_code = @p{parameters.Count}");
            parameters.Add(course);
        }

        queryBuilder.Append(')');

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
}