using System.Text;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Database.Util;

namespace StudyPlannerAPI.Model;

public class LinkShareManager : ILinkShareManager
{
    private readonly IDatabaseMutationManager databaseMutationManager;
    private readonly IDatabaseQueryManager databaseQueryManager;
    private readonly ILogger<LinkShareManager> logger;

    public LinkShareManager(IDatabaseQueryManager databaseQueryManager,
        IDatabaseMutationManager databaseMutationManager, ILogger<LinkShareManager> logger,
        IConfiguration configuration)
    {
        this.databaseQueryManager = (IDatabaseQueryManager)DatabaseUtil.ConfigureDatabaseManager(databaseQueryManager,
            configuration, Constants.CONNECTION_STRING_LINKS);

        this.databaseMutationManager = (IDatabaseMutationManager)DatabaseUtil.ConfigureDatabaseManager(
            databaseMutationManager, configuration,
            Constants.CONNECTION_STRING_LINKS);

        this.logger = logger;
    }

    public async Task<IActionResult> GetPlanFromUniqueBlob(string uniqueBlob)
    {
        var queryBuilder = new StringBuilder();
        var parameters = new List<string> { uniqueBlob };

        // Get plan name
        queryBuilder.AppendLine(
            @$"SELECT {Columns.STUDY_PLAN_NAME}, {Columns.PROGRAMME_CODE}, {Columns.YEAR}
               FROM {Tables.STUDY_PLAN}
               WHERE {Columns.STUDY_PLAN_ID} = @p0");
        var query = queryBuilder.ToString();
        var studyPlanDTOList = await databaseQueryManager.ExecuteQuery<StudyPlanDTO>(query, parameters.ToArray());
        if (studyPlanDTOList.Count == 0)
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        var studyPlanDTO = studyPlanDTOList.First();

        // Get masters
        queryBuilder.Clear();
        queryBuilder.AppendLine(
            @$"SELECT {Columns.MASTER_CODE}
               FROM {Tables.STUDY_PLAN_MASTER}
               WHERE {Columns.STUDY_PLAN_ID} = @p0");
        query = queryBuilder.ToString();
        var masterCodes =
            (await databaseQueryManager.ExecuteQuery<MasterCodeDTO>(query, parameters.ToArray()))
            .Select(dto => dto.master_code).ToList();

        // Get courses
        queryBuilder.Clear();
        queryBuilder.AppendLine(
            @$"SELECT {Columns.COURSE_CODE}, {Columns.STUDY_YEAR}, {Columns.PERIOD_START}, {Columns.PERIOD_END}
               FROM {Tables.STUDY_PLAN_COURSE}
               WHERE {Columns.STUDY_PLAN_ID} = @p0");
        query = queryBuilder.ToString();
        var courses =
            (await databaseQueryManager.ExecuteQuery<SelectedCourseDTO>(query, parameters.ToArray())).ToList();

        var result = new LinkShareDTO
        {
            Programme = studyPlanDTO.programme_code,
            StudyPlanName = studyPlanDTO.study_plan_name,
            Year = studyPlanDTO.year,
            MasterCodes = masterCodes,
            SelectedCourses = courses
        };

        return new JsonResult(result);
    }

    public async Task<IActionResult> GetUniqueBlobFromPlan(string programme, string year, List<string> masters,
        List<SelectedCourseDTO> selectedCourses,
        string studyPlanName)
    {
        var queryBuilder = new StringBuilder();
        queryBuilder.AppendLine(
            @$"INSERT INTO {Tables.STUDY_PLAN}({Columns.STUDY_PLAN_NAME}, {Columns.YEAR}, {Columns.PROGRAMME_CODE})
               VALUES (@p0, @p1, @p2)
               RETURNING {Columns.STUDY_PLAN_ID}");
        var parameters = new List<object>
        {
            studyPlanName,
            year,
            programme
        };
        var query = queryBuilder.ToString();
        var studyPlanId =
            await Task.Run(() => databaseMutationManager.ExecuteScalar<string>(query, parameters.ToArray())) ??
            string.Empty;

        if (studyPlanId == string.Empty)
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        // Add masters
        queryBuilder.Clear();
        parameters.Clear();
        queryBuilder.AppendLine(
            $"INSERT INTO {Tables.STUDY_PLAN_MASTER}({Columns.STUDY_PLAN_ID}, {Columns.MASTER_CODE}) VALUES");
        queryBuilder.AppendLine($"(\"{studyPlanId}\", @p0)");
        parameters.Add(masters[0]); // Should never fail
        for (var i = 1; i < masters.Count; i++)
        {
            queryBuilder.AppendLine($",(\"{studyPlanId}\", @p{i})");
            parameters.Add(masters[i]);
        }

        query = queryBuilder.ToString();
        await Task.Run(() => databaseMutationManager.ExecuteScalar<dynamic>(query, parameters.ToArray()));

        // Add courses
        queryBuilder.Clear();
        parameters.Clear();
        queryBuilder.AppendLine(
            $"INSERT INTO {Tables.STUDY_PLAN_COURSE}({Columns.STUDY_PLAN_ID}, {Columns.COURSE_CODE}, {Columns.STUDY_YEAR}, {Columns.PERIOD_START}, {Columns.PERIOD_END}) VALUES");

        var paramCount = 0;
        foreach (var course in selectedCourses)
        {
            var prefix = paramCount != 0 ? "," : string.Empty;
            queryBuilder.AppendLine(
                $"{prefix}(\"{studyPlanId}\", @p{paramCount++}, @p{paramCount++}, @p{paramCount++}, @p{paramCount++})");
            parameters.Add(course.course_code);
            parameters.Add(course.study_year);
            parameters.Add(course.period_start);
            parameters.Add(course.period_end);
        }

        query = queryBuilder.ToString();
        await Task.Run(() => databaseMutationManager.ExecuteScalar<dynamic>(query, parameters.ToArray()));

        var result = new UniqueBlobDTO { StudyPlanId = studyPlanId };
        return new JsonResult(result);
    }
}