﻿using System.Text;
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
            var table = Util.YearPatternToTable(year);
            var column = Util.YearPatternToColumn(year);
            var parameters = new List<string>
            {
                programme,
                year
            };
            var query =
                $"SELECT DISTINCT({Columns.MASTER_CODE}) FROM {table} JOIN {Tables.MASTERS} USING({Columns.MASTER_CODE}) WHERE {Columns.PROGRAMME_CODE} = @p0 AND {column} = @p1";
            var queryResult = await databaseManager.ExecuteQuery<MasterCodeDTO>(query, parameters.ToArray());
            masterCodes = queryResult.Select(dto => dto.master_code).ToList();
        }

        if (!masterCodes.Contains(Constants.GENERAL))
        {
            masterCodes.Add(Constants.GENERAL);
        }

        masterCodes.Add("summary");
        var result = new List<MasterValidationResult>();
        foreach (var masterCode in masterCodes)
        {
            var validationResult = await ValidateMaster(programme, masterCode, year, selectedCourses);
            result.Add(validationResult);
        }

        return new JsonResult(result);
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
            @$"SELECT DISTINCT({Columns.COURSE_CODE}), {Columns.CREDITS}, {Columns.LEVEL}
               FROM {Tables.PROGRAMME_MASTER_COURSE_CLASS} JOIN {Tables.COURSES} USING({Columns.COURSE_CODE})
               WHERE {Columns.PROGRAMME_CODE} = @p0 AND {Columns.CLASS_YEAR} = @p1");

        if (masterCode == Constants.SUMMARY)
        {
            queryBuilder.AppendLine($"AND ({Columns.ELECTABILITY} = @p2 OR {Columns.ELECTABILITY} = @p3)");
            parameters.Add(Constants.ELECTIVE);
            parameters.Add(Constants.EXTERNAL_ELECTIVE);
        }
        else
        {
            queryBuilder.AppendLine($"AND {Columns.MASTER_CODE} = @p{parameters.Count}");
            parameters.Add(masterCode);
        }

        condStmtBuilder.AppendLine(" AND (");
        foreach (var course in selectedCourses)
        {
            var op = course == selectedCourses.First() ? string.Empty : "OR";
            condStmtBuilder.Append($" {op} {Columns.COURSE_CODE} = @p{parameters.Count}");
            parameters.Add(course);
        }

        condStmtBuilder.Append(')');

        queryBuilder.AppendLine(condStmtBuilder.ToString());
        var query = queryBuilder.ToString();
        Console.WriteLine(query);
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
            RequirementsFulfilled = masterCode != Constants.SUMMARY
                ? advancedCredits >= Constants.REQUIRED_A_CREDITS_MASTER &&
                  totalCredits >= Constants.REQUIRED_CREDITS_MASTER
                : advancedCredits >= Constants.REQUIRED_A_CREDITS_TOTAL &&
                  totalCredits >= Constants.REQUIRED_CREDITS_TOTAL
        };
        return result;
    }
}