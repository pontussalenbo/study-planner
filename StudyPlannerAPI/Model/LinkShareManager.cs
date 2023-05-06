using System.Text;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public class LinkShareManager : ILinkShareManager
{
    private readonly IDatabaseManager databaseManager;
    private readonly ILogger<LinkShareManager> logger;

    public LinkShareManager(IDatabaseManager databaseManager, ILogger<LinkShareManager> logger,
        IConfiguration configuration)
    {
        this.databaseManager = databaseManager;
        this.databaseManager.SetConnectionString(configuration[Constants.CONNECTION_STRING_LINKS]);
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
        var studyPlanDTOList = await databaseManager.ExecuteQuery<StudyPlanDTO>(query, parameters.ToArray());
        if (studyPlanDTOList.Count == 0)
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        var studyPlanDTO = studyPlanDTOList[0];

        // Get masters
        queryBuilder.Clear();
        queryBuilder.AppendLine(
            @$"SELECT {Columns.MASTER_CODE}
               FROM {Tables.STUDY_PLAN_MASTER}
               WHERE {Columns.STUDY_PLAN_ID} = @p0");
        query = queryBuilder.ToString();
        var masterCodes =
            (await databaseManager.ExecuteQuery<MasterCodeDTO>(query, parameters.ToArray()))
            .Select(dto => dto.master_code).ToList();

        // Get courses
        queryBuilder.Clear();
        queryBuilder.AppendLine(
            @$"SELECT {Columns.COURSE_CODE}, {Columns.STUDY_YEAR}, {Columns.PERIOD_START}, {Columns.PERIOD_END}
               FROM {Tables.STUDY_PLAN_COURSE}
               WHERE {Columns.STUDY_PLAN_ID} = @p0");
        query = queryBuilder.ToString();
        var courses =
            (await databaseManager.ExecuteQuery<SelectedCourseDTO>(query, parameters.ToArray())).ToList();

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
        var studyPlanId = await Task.Run(() => databaseManager.ExecuteScalar<string>(query, parameters.ToArray())) ??
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
        _ = await Task.Run(() => databaseManager.ExecuteScalar<dynamic>(query, parameters.ToArray()));

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
        _ = await Task.Run(() => databaseManager.ExecuteScalar<dynamic>(query, parameters.ToArray()));

        var result = new UniqueBlobDTO { StudyPlanId = studyPlanId };
        return new JsonResult(result);
    }
}