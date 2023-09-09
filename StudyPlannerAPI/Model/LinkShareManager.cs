using System.Text;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;

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
            configuration, Constants.CONNECTION_STRING);

        this.databaseMutationManager = (IDatabaseMutationManager)DatabaseUtil.ConfigureDatabaseManager(
            databaseMutationManager, configuration,
            Constants.CONNECTION_STRING);

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
               WHERE {Columns.STUDY_PLAN_ID} = @p0
               OR {Columns.STUDY_PLAN_READ_ONLY_ID} = @p0");
        var query = queryBuilder.ToString();
        var studyPlanDTOList =
            (await databaseQueryManager.ExecuteQuery<StudyPlanDTO>(query, parameters.ToArray())).ToList();
        if (studyPlanDTOList.Count == 0)
        {
            return new BadRequestResult();
        }

        var studyPlanDTO = studyPlanDTOList.First();

        // Get courses
        queryBuilder.Clear();
        queryBuilder.AppendLine(
            @$"SELECT {Columns.COURSE_CODE}, {Columns.STUDY_YEAR}, {Columns.PERIOD_START}, {Columns.PERIOD_END}
               FROM {Tables.STUDY_PLAN_COURSE}
               WHERE {Columns.STUDY_PLAN_ID} = @p0
                   OR {Columns.STUDY_PLAN_ID} IN (SELECT {Columns.STUDY_PLAN_ID}
                                                  FROM {Tables.STUDY_PLAN}
                                                  WHERE {Columns.STUDY_PLAN_READ_ONLY_ID} = @p0)");
        query = queryBuilder.ToString();
        var courses =
            (await databaseQueryManager.ExecuteQuery<SelectedCourseDTO>(query, parameters.ToArray())).ToList();

        var result = new LinkShareDTO
        {
            Programme = studyPlanDTO.programme_code,
            StudyPlanName = studyPlanDTO.study_plan_name,
            Year = studyPlanDTO.year,
            SelectedCourses = courses
        };

        return new JsonResult(result);
    }

    public async Task<IActionResult> GetUniqueBlobFromPlan(string programme, string year,
        List<SelectedCourseDTO> selectedCourses, string studyPlanName, string uniqueBlob)
    {
        var studyPlanId = uniqueBlob;

        if (await IsReadOnly(studyPlanId))
        {
            return new BadRequestResult();
        }

        if (StudyPlanExists(studyPlanId))
        {
            DeleteStudyPlanCourses(studyPlanId);
            UpdateStudyPlanName(studyPlanName, studyPlanId);
        }
        else
        {
            studyPlanId = CreateStudyPlan(studyPlanName, year, programme);
            if (studyPlanId == string.Empty)
            {
                return new BadRequestResult();
            }
        }

        AddStudyPlanCourses(studyPlanId, selectedCourses);
        var studyPlanReadOnlyId = await GetReadOnlyId(studyPlanId);

        var result = new UniqueBlobDTO
        {
            StudyPlanId = studyPlanId,
            StudyPlanReadOnlyId = studyPlanReadOnlyId
        };
        return new JsonResult(result);
    }

    private async Task<bool> IsReadOnly(string studyPlanId)
    {
        var queryBuilder = new StringBuilder();
        queryBuilder.AppendLine(@$"SELECT {Columns.STUDY_PLAN_READ_ONLY_ID}
                                   FROM {Tables.STUDY_PLAN} 
                                   WHERE {Columns.STUDY_PLAN_READ_ONLY_ID} = @p0");
        var parameters = new List<object>
        {
            studyPlanId
        };
        var query = queryBuilder.ToString();
        var resultList = await databaseQueryManager.ExecuteQuery<dynamic>(query, parameters.ToArray());
        return resultList.Count > 0;
    }

    private bool StudyPlanExists(string studyPlanId)
    {
        var queryBuilder = new StringBuilder();
        queryBuilder.AppendLine(
            $@"SELECT {Columns.STUDY_PLAN_ID} FROM {Tables.STUDY_PLAN} WHERE {Columns.STUDY_PLAN_ID} = @p0");
        var query = queryBuilder.ToString();
        var parameters = new List<object> { studyPlanId };
        var result = databaseQueryManager.ExecuteQuery<int>(query, parameters.ToArray()).Result;
        return result.Count > 0;
    }

    private void DeleteStudyPlanCourses(string studyPlanId)
    {
        var queryBuilder = new StringBuilder();
        var parameters = new List<object> { studyPlanId };
        queryBuilder.AppendLine($@"DELETE FROM {Tables.STUDY_PLAN_COURSE} WHERE {Columns.STUDY_PLAN_ID} = @p0");
        var query = queryBuilder.ToString();
        databaseMutationManager.ExecuteScalar(query, parameters.ToArray());
    }

    private void UpdateStudyPlanName(string studyPlanName, string studyPlanId)
    {
        if (studyPlanName == string.Empty)
        {
            return;
        }

        var queryBuilder = new StringBuilder();
        queryBuilder.AppendLine($@"UPDATE {Tables.STUDY_PLAN}
                                   SET {Columns.STUDY_PLAN_NAME} = @p0
                                   WHERE {Columns.STUDY_PLAN_ID} = @p1");
        var parameters = new List<object>
        {
            studyPlanName,
            studyPlanId
        };
        var query = queryBuilder.ToString();
        databaseMutationManager.ExecuteScalar(query, parameters.ToArray());
    }

    private string CreateStudyPlan(string studyPlanName, string year, string programme)
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
        var studyPlanId = databaseMutationManager.ExecuteScalar<string>(query, parameters.ToArray()) ?? string.Empty;
        return studyPlanId;
    }

    private async Task<string> GetReadOnlyId(string studyPlanId)
    {
        var queryBuilder = new StringBuilder();
        queryBuilder.AppendLine(
            $"SELECT {Columns.STUDY_PLAN_READ_ONLY_ID} FROM {Tables.STUDY_PLAN} WHERE {Columns.STUDY_PLAN_ID} = @p0");
        var parameters = new List<object> { studyPlanId };
        var query = queryBuilder.ToString();
        var studyPlanReadOnlyId =
            (await Task.Run(() =>
                databaseQueryManager.ExecuteQuery<StudyPlanIdDTO>(query, parameters.ToArray())))[0]
            .study_plan_read_only_id; // Should never fail
        return studyPlanReadOnlyId;
    }

    private void AddStudyPlanCourses(string studyPlanId, List<SelectedCourseDTO> selectedCourses)
    {
        var queryBuilder = new StringBuilder();
        queryBuilder.AppendLine(
            $"INSERT INTO {Tables.STUDY_PLAN_COURSE}({Columns.STUDY_PLAN_ID}, {Columns.COURSE_CODE}, {Columns.STUDY_YEAR}, {Columns.PERIOD_START}, {Columns.PERIOD_END}) VALUES");

        var parameters = new List<object>();
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

        var query = queryBuilder.ToString();
        databaseMutationManager.ExecuteScalar(query, parameters.ToArray());
    }
}