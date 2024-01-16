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
///     Default implementation of the link share service
/// </summary>
public class LinkShareManager : ILinkShareManager
{
    private readonly IDatabaseManager db;
    private readonly ILogger<LinkShareManager> logger;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="databaseManager"></param>
    /// <param name="logger"></param>
    /// <param name="configuration"></param>
    public LinkShareManager(IDatabaseManager databaseManager, ILogger<LinkShareManager> logger,
        IConfiguration configuration)
    {
        db = DatabaseUtil.ConfigureDatabaseManager(databaseManager, configuration, Constants.CONNECTION_STRING);
        this.logger = logger;
    }

    /// <inheritdoc />
    public async Task<IActionResult> GetStudyPlanFromId(string studyPlanId)
    {
        var isReadOnly = await IsReadOnly(studyPlanId);

        // Get plan info
        var query = new Query(Tables.STUDY_PLAN)
            .Select(Columns.STUDY_PLAN_NAME, Columns.PROGRAMME_CODE, Columns.YEAR)
            .Where(Columns.STUDY_PLAN_ID, studyPlanId)
            .OrWhere(Columns.STUDY_PLAN_READ_ONLY_ID, studyPlanId);

        var studyPlanDTOList = await db.ExecuteQuery<StudyPlanDTO>(query);
        if (studyPlanDTOList.Count == 0)
        {
            return new BadRequestResult();
        }

        var studyPlanDTO = studyPlanDTOList.First();

        // Get plan courses
        query = new Query(Tables.STUDY_PLAN_COURSE)
            .Select(Columns.COURSE_CODE, Columns.STUDY_YEAR, Columns.PERIOD_START, Columns.PERIOD_END)
            .Where(Columns.STUDY_PLAN_ID, studyPlanId)
            .OrWhereIn(Columns.STUDY_PLAN_ID,
                new Query(Tables.STUDY_PLAN)
                    .Select(Columns.STUDY_PLAN_ID)
                    .Where(Columns.STUDY_PLAN_READ_ONLY_ID, studyPlanId));
        var courses = await db.ExecuteQuery<SelectedCourseDTO>(query);

        // Get custom courses
        query = new Query(Tables.STUDY_PLAN_CUSTOM_COURSE)
            .Select(Columns.COURSE_CODE, Columns.COURSE_NAME, Columns.LEVEL, Columns.CREDITS, Columns.STUDY_YEAR,
                Columns.PERIOD_START, Columns.PERIOD_END)
            .Where(Columns.STUDY_PLAN_ID, studyPlanId)
            .OrWhereIn(Columns.STUDY_PLAN_ID,
                new Query(Tables.STUDY_PLAN)
                    .Select(Columns.STUDY_PLAN_ID)
                    .Where(Columns.STUDY_PLAN_READ_ONLY_ID, studyPlanId));
        var customCourses = await db.ExecuteQuery<CustomCourseDTO>(query);

        var result = new LinkShareDTO
        {
            StudyPlanReadOnlyId = isReadOnly ? studyPlanId : await GetReadOnlyId(studyPlanId),
            Programme = studyPlanDTO.programme_code,
            StudyPlanName = studyPlanDTO.study_plan_name,
            Year = studyPlanDTO.year,
            SelectedCourses = courses,
            CustomCourses = customCourses,
            IsReadOnly = isReadOnly
        };

        return new JsonResult(result);
    }

    /// <inheritdoc />
    public async Task<IActionResult> GetIdFromStudyPlan(string programme, string year,
        List<SelectedCourseDTO> selectedCourses, string studyPlanName, string studyPlanId,
        List<CustomCourseDTO> customCourses)
    {
        if (await IsReadOnly(studyPlanId))
        {
            return new BadRequestResult();
        }

        if (await StudyPlanExists(studyPlanId))
        {
            await DeleteStudyPlanCourses(studyPlanId);
            await DeleteStudyPlanCustomCourses(studyPlanId);
            await UpdateStudyPlanName(studyPlanName, studyPlanId);
        }
        else
        {
            studyPlanId = await CreateStudyPlan(studyPlanName, year, programme);
            logger.LogInformation("Plan created with id: {id}", studyPlanId);
            if (studyPlanId == string.Empty)
            {
                return new BadRequestResult();
            }
        }

        await AddStudyPlanCourses(studyPlanId, selectedCourses);
        await AddStudyPlanCustomCourses(studyPlanId, customCourses);
        var studyPlanReadOnlyId = await GetReadOnlyId(studyPlanId);
        if (studyPlanReadOnlyId == string.Empty)
        {
            return new BadRequestResult();
        }

        var result = new StudyPlanIdResult
        {
            StudyPlanId = studyPlanId,
            StudyPlanReadOnlyId = studyPlanReadOnlyId
        };
        return new JsonResult(result);
    }

    /// <inheritdoc />
    public async Task<IActionResult> GetReadOnlyIdFromId(string studyPlanId)
    {
        if (studyPlanId == string.Empty || await IsReadOnly(studyPlanId))
        {
            return new BadRequestResult();
        }

        var readOnlyId = await GetReadOnlyId(studyPlanId);

        if (readOnlyId == string.Empty)
        {
            return new NotFoundResult();
        }

        var result = new StudyPlanIdResult
        {
            StudyPlanId = studyPlanId,
            StudyPlanReadOnlyId = readOnlyId
        };

        return new JsonResult(result);
    }

    private async Task<bool> IsReadOnly(string studyPlanId)
    {
        var query = new Query(Tables.STUDY_PLAN)
            .Select(Columns.STUDY_PLAN_READ_ONLY_ID)
            .Where(Columns.STUDY_PLAN_READ_ONLY_ID, studyPlanId);
        var result = await db.ExecuteQuery<string>(query);
        return result.Count > 0;
    }

    private async Task<bool> StudyPlanExists(string studyPlanId)
    {
        var query = new Query(Tables.STUDY_PLAN)
            .Select(Columns.STUDY_PLAN_ID)
            .Where(Columns.STUDY_PLAN_ID, studyPlanId)
            .AsCount();
        var result = await db.ExecuteQuery<int>(query);
        return result.First() > 0;
    }

    private async Task DeleteStudyPlanCourses(string studyPlanId)
    {
        var query = new Query(Tables.STUDY_PLAN_COURSE)
            .Where(Columns.STUDY_PLAN_ID, studyPlanId)
            .AsDelete();
        await db.ExecuteQuery<int>(query);
    }

    private async Task DeleteStudyPlanCustomCourses(string studyPlanId)
    {
        var query = new Query(Tables.STUDY_PLAN_CUSTOM_COURSE)
            .Where(Columns.STUDY_PLAN_ID, studyPlanId)
            .AsDelete();
        await db.ExecuteQuery<int>(query);
    }

    private async Task UpdateStudyPlanName(string studyPlanName, string studyPlanId)
    {
        if (studyPlanName == string.Empty)
        {
            return;
        }

        var query = new Query(Tables.STUDY_PLAN)
            .Where(Columns.STUDY_PLAN_ID, studyPlanId)
            .AsUpdate(new[] { Columns.STUDY_PLAN_NAME }, new[] { studyPlanName });
        await db.ExecuteQuery<int>(query);
    }

    private async Task<string> CreateStudyPlan(string studyPlanName, string year, string programme)
    {
        if (studyPlanName == string.Empty)
        {
            studyPlanName = Constants.STUDY_PLAN_NAME_DEFAULT;
        }

        var data = new List<KeyValuePair<string, object>>
        {
            new(Columns.STUDY_PLAN_NAME, studyPlanName),
            new(Columns.YEAR, year),
            new(Columns.PROGRAMME_CODE, programme)
        };

        var rowId = await db.ExecuteInsert(Tables.STUDY_PLAN, data);
        var query = new Query(Tables.STUDY_PLAN)
            .Select(Columns.STUDY_PLAN_ID)
            .Where(Columns.ROW_ID, rowId);
        var result = await db.ExecuteQuery<string>(query);
        return result.FirstOrDefault(string.Empty);
    }

    private async Task<string> GetReadOnlyId(string studyPlanId)
    {
        var query = new Query(Tables.STUDY_PLAN)
            .Select(Columns.STUDY_PLAN_READ_ONLY_ID)
            .Where(Columns.STUDY_PLAN_ID, studyPlanId);
        logger.LogInformation("Getting read only id for plan with id: {id}", studyPlanId);
        var result = await db.ExecuteQuery<string>(query);
        return result.FirstOrDefault(string.Empty);
    }

    private async Task AddStudyPlanCourses(string studyPlanId, List<SelectedCourseDTO> selectedCourses)
    {
        if (selectedCourses.Count == 0)
        {
            return;
        }

        var cols = new List<string>
        {
            Columns.STUDY_PLAN_ID,
            Columns.COURSE_CODE,
            Columns.STUDY_YEAR,
            Columns.PERIOD_START,
            Columns.PERIOD_END
        };

        var data = new List<List<object>>();
        selectedCourses.ForEach(c => data.Add(new
            List<object> { studyPlanId, c.course_code, c.study_year, c.period_start, c.period_end }));

        var query = new Query(Tables.STUDY_PLAN_COURSE)
            .AsInsert(cols, data);
        await db.ExecuteQuery<int>(query);
    }

    private async Task AddStudyPlanCustomCourses(string studyPlanId, List<CustomCourseDTO> customCourses)
    {
        if (customCourses.Count == 0)
        {
            return;
        }

        var cols = new List<string>
        {
            Columns.STUDY_PLAN_ID, Columns.COURSE_CODE, Columns.COURSE_NAME, Columns.LEVEL, Columns.CREDITS,
            Columns.STUDY_YEAR, Columns.PERIOD_START, Columns.PERIOD_END
        };

        var data = new List<List<object>>();
        customCourses.ForEach(c => data.Add(new List<object>
        {
            studyPlanId, c.course_code, c.course_name, c.level, c.credits, c.study_year, c.period_start, c.period_end
        }));

        var query = new Query(Tables.STUDY_PLAN_CUSTOM_COURSE)
            .AsInsert(cols, data);
        await db.ExecuteQuery<int>(query);
    }
}