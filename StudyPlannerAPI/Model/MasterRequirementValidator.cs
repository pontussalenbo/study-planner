using System.Text;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;

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

    public async Task<IActionResult> ValidateCourseSelection(string programme,
        string year, List<string> selectedCourses, List<string> masterCodes)
    {
        if (masterCodes.Count == 0) // if there are no provided master codes, compute for all
        {
            const string query =
                @$"SELECT {Columns.MASTER_CODE}
                   FROM {Tables.PROGRAMME_MASTER}
                   WHERE {Columns.PROGRAMME_CODE} = @p0";
            var queryResult = await databaseManager.ExecuteQuery<MasterCodeDTO>(query, programme);
            masterCodes = queryResult.Select(dto => dto.master_code).ToList();
        }

        if (!masterCodes.Contains(Constants.GENERAL))
        {
            masterCodes.Add(Constants.GENERAL);
        }

        var result = new List<MasterValidationResult>();
        foreach (var masterCode in masterCodes)
        {
            var validationResult = await ValidateMaster(masterCode, year, selectedCourses);
            result.Add(validationResult);
        }

        return new JsonResult(result);
    }

    private async Task<MasterValidationResult> ValidateMaster(string masterCode, string year,
        List<string> selectedCourses)
    {
        var parameters = new List<string>();
        var queryBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();

        queryBuilder.AppendLine($"SELECT DISTINCT({Columns.COURSE_CODE}), {Columns.CREDITS}, {Columns.LEVEL}");

        var condTable = Util.YearPatternToTable(year);
        var condColumn = Util.YearPatternToColumn(year);

        queryBuilder.AppendLine($"FROM {condTable}");
        condStmtBuilder.AppendLine($"WHERE {condColumn} = @p{parameters.Count}");
        parameters.Add(year);

        queryBuilder.AppendLine(
            @$"JOIN {Tables.COURSE_MASTER} USING({Columns.COURSE_CODE})
               JOIN {Tables.COURSES} USING({Columns.COURSE_CODE}) ");
        condStmtBuilder.AppendLine($" AND {Columns.MASTER_CODE} = @p{parameters.Count} AND (");
        parameters.Add(masterCode);

        foreach (var course in selectedCourses)
        {
            var op = parameters.Count == 2 /*is a magic number!*/ ? string.Empty : "OR";
            condStmtBuilder.Append($" {op} {Columns.COURSE_CODE} = @p{parameters.Count}");
            parameters.Add(course);
        }

        condStmtBuilder.Append(')');

        queryBuilder.AppendLine(condStmtBuilder.ToString());
        var query = queryBuilder.ToString();
        var queryResult =
            await databaseManager.ExecuteQuery<CourseDTO>(query, parameters.ToArray());

        var advancedCredits = queryResult.Where(c => c.level == Constants.A_CREDITS).Sum(c => c.credits);
        var g1Credits = queryResult.Where(c => c.level == Constants.G1_CREDITS).Sum(c => c.credits);
        var g2Credits = queryResult.Where(c => c.level == Constants.G2_CREDITS).Sum(c => c.credits);
        var totalCredits = queryResult.Sum(c => c.credits);
        var result = new MasterValidationResult
        {
            Master = masterCode,
            AdvancedCredits = advancedCredits,
            G1Credits = g1Credits,
            G2Credits = g2Credits,
            RequirementsFulfilled = masterCode != Constants.GENERAL
                ? advancedCredits >= Constants.REQUIRED_A_CREDITS_MASTER &&
                  totalCredits >= Constants.REQUIRED_CREDITS_MASTER
                : advancedCredits >= Constants.REQUIRED_A_CREDITS_TOTAL &&
                  totalCredits >= Constants.REQUIRED_CREDITS_TOTAL
        };
        return result;
    }
}