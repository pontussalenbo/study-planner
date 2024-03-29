/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

using Microsoft.AspNetCore.Mvc;
using SqlKata;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Default implementation of the master requirements validator service
/// </summary>
public class MasterRequirementValidator : IMasterRequirementValidator
{
    private readonly IDatabaseManager db;
    private readonly ILogger<MasterRequirementValidator> logger;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="databaseManager"></param>
    /// <param name="configuration"></param>
    /// <param name="logger"></param>
    public MasterRequirementValidator(IDatabaseManager databaseManager, IConfiguration configuration,
        ILogger<MasterRequirementValidator> logger)
    {
        db = DatabaseUtil.ConfigureDatabaseManager(databaseManager, configuration, Constants.CONNECTION_STRING);
        this.logger = logger;
    }

    /// <inheritdoc />
    public async Task<IActionResult> ValidateCourseSelection(string programme,
        string year, List<string> selectedCourses, List<string> masterCodes, List<CustomCourseMinimalDTO> customCourses)
    {
        if (masterCodes.Count == 0) // If there are no provided master codes, compute for all applicable
        {
            var table = ModelUtil.YearPatternToTable(year);
            var column = ModelUtil.YearPatternToColumn(year);
            var query = new Query(table)
                .Join(Tables.MASTERS, $"{Tables.MASTERS}.{Columns.MASTER_CODE}", $"{table}.{Columns.MASTER_CODE}")
                .Select($"{table}.{Columns.MASTER_CODE}")
                .Distinct()
                .Where(Columns.PROGRAMME_CODE, programme)
                .Where(column, year);
            masterCodes = await db.ExecuteQuery<string>(query);
        }

        if (!masterCodes.Contains(Constants.GENERAL))
        {
            masterCodes.Add(Constants.GENERAL);
        }

        var result = new List<MasterValidationResult>();
        foreach (var masterCode in masterCodes)
        {
            var validationResult = await ValidateMaster(programme, masterCode, year, selectedCourses);
            result.Add(validationResult);
        }

        result.Add(await GetSummary(selectedCourses, customCourses));

        return new JsonResult(result);
    }

    private async Task<MasterValidationResult> ValidateMaster(string programme, string masterCode, string year,
        IReadOnlyCollection<string> selectedCourses)
    {
        var query = new Query(Tables.PROGRAMME_MASTER_COURSE_CLASS)
            .Join(Tables.COURSES,
                $"{Tables.COURSES}.{Columns.COURSE_CODE}",
                $"{Tables.PROGRAMME_MASTER_COURSE_CLASS}.{Columns.COURSE_CODE}")
            .Select($"{Tables.COURSES}.{Columns.COURSE_CODE}")
            .Distinct()
            .Select(Columns.CREDITS, Columns.LEVEL)
            .Where(Columns.PROGRAMME_CODE, programme)
            .Where(Columns.CLASS_YEAR, year)
            .Where(Columns.MASTER_CODE, masterCode)
            .Where(q =>
            {
                const string col = $"{Tables.COURSES}.{Columns.COURSE_CODE}";
                q = q.Where(col, selectedCourses.First());
                return selectedCourses.Skip(1).Aggregate(q, (current, courseCode) => current.OrWhere(col, courseCode));
            });

        var queryResult = await db.ExecuteQuery<CourseDTO>(query);

        var advancedCredits = queryResult.Where(c => c.level == Constants.A).Sum(c => c.credits);
        var g1Credits = queryResult.Where(c => c.level == Constants.G1).Sum(c => c.credits);
        var g2Credits = queryResult.Where(c => c.level == Constants.G2).Sum(c => c.credits);
        var totalCredits = queryResult.Sum(c => c.credits);
        var coursesInMaster = queryResult.Select(c => c.course_code).ToList();

        return new MasterValidationResult
        {
            Master = masterCode,
            AdvancedCredits = advancedCredits,
            G1Credits = g1Credits,
            G2Credits = g2Credits,
            SelectedCourses = coursesInMaster,
            RequirementsFulfilled = masterCode != Constants.GENERAL &&
                                    advancedCredits >= Constants.REQUIRED_A_CREDITS_MASTER &&
                                    totalCredits >= Constants.REQUIRED_CREDITS_MASTER
        };
    }

    private async Task<MasterValidationResult> GetSummary(IReadOnlyCollection<string> selectedCourses,
        IReadOnlyCollection<CustomCourseMinimalDTO> customCourses)
    {
        var query = new Query(Tables.COURSES)
            .Select(Columns.COURSE_CODE).Distinct()
            .Select(Columns.CREDITS, Columns.LEVEL)
            .Where(q =>
            {
                q = q.Where(Columns.COURSE_CODE, selectedCourses.First());
                return selectedCourses.Skip(1).Aggregate(q,
                    (current, courseCode) => current.OrWhere(Columns.COURSE_CODE, courseCode));
            });

        var queryResult = await db.ExecuteQuery<CourseDTO>(query);

        var advancedCredits = queryResult.Where(c => c.level == Constants.A).Sum(c => c.credits);
        var g1Credits = queryResult.Where(c => c.level == Constants.G1).Sum(c => c.credits);
        var g2Credits = queryResult.Where(c => c.level == Constants.G2).Sum(c => c.credits);
        var totalCredits = queryResult.Sum(c => c.credits);
        var coursesInMaster = queryResult.Select(c => c.course_code).ToList();
        coursesInMaster.AddRange(customCourses.Select(c => c.course_code));

        return new MasterValidationResult
        {
            Master = Constants.SUMMARY,
            AdvancedCredits = advancedCredits,
            G1Credits = g1Credits,
            G2Credits = g2Credits,
            SelectedCourses = coursesInMaster,
            RequirementsFulfilled =
                advancedCredits >= Constants.REQUIRED_A_CREDITS_TOTAL &&
                totalCredits >= Constants.REQUIRED_CREDITS_TOTAL
        };
    }
}