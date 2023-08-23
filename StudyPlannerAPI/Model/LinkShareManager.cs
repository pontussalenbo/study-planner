using System.Text;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using static StudyPlannerAPI.Database.Columns;
using static StudyPlannerAPI.Database.Tables;
using static StudyPlannerAPI.Constants;
using static StudyPlannerAPI.Database.DatabaseUtil;


namespace StudyPlannerAPI.Model;

public class LinkShareManager : ILinkShareManager
{
    private readonly IDatabaseMutationManager databaseMutationManager;
    private readonly IDatabaseQueryManager databaseQueryManager;
    private readonly ILogger<LinkShareManager> logger;
    private readonly string connectionString;

    public LinkShareManager(IDatabaseQueryManager databaseQueryManager,
        IDatabaseMutationManager databaseMutationManager, ILogger<LinkShareManager> logger,
        IConfiguration configuration)
    {
        connectionString = configuration[CONNECTION_STRING_LINKS];
        this.databaseQueryManager = (IDatabaseQueryManager)ConfigureDatabaseManager(databaseQueryManager,
            configuration, CONNECTION_STRING_LINKS);

        this.databaseMutationManager = (IDatabaseMutationManager)ConfigureDatabaseManager(
            databaseMutationManager, configuration,
            CONNECTION_STRING_LINKS);

        this.logger = logger;
    }

    public async Task<LinkShareDTO> GetPlanFromUniqueBlob(string uniqueBlob)
    {
        var queryBuilder = new StringBuilder();
        var parameters = new List<string> { uniqueBlob };

        // Get plan name
        queryBuilder.AppendLine(
            @$"SELECT {STUDY_PLAN_NAME}, {PROGRAMME_CODE}, {YEAR}
               FROM {STUDY_PLAN}
               WHERE {STUDY_PLAN_ID} = {QueryParam(0)}");
        var query = queryBuilder.ToString();
        var studyPlanDTOList = await databaseQueryManager.ExecuteQuery<StudyPlanDTO>(query, parameters.ToArray());

        var studyPlanDTO = studyPlanDTOList.First();

        // Get masters
        queryBuilder.Clear();
        queryBuilder.AppendLine(
            @$"SELECT {MASTER_CODE}
               FROM {STUDY_PLAN_MASTER}
               WHERE {STUDY_PLAN_ID} = {QueryParam(0)}");
        query = queryBuilder.ToString();
        var masterCodes =
            (await databaseQueryManager.ExecuteQuery<MasterCodeDTO>(query, parameters.ToArray()))
            .Select(dto => dto.master_code).ToList();

        // Get courses
        queryBuilder.Clear();
        queryBuilder.AppendLine(
            @$"SELECT {COURSE_CODE}, {STUDY_YEAR}, {PERIOD_START}, {PERIOD_END}
               FROM {STUDY_PLAN_COURSE}
               WHERE {STUDY_PLAN_ID} = {QueryParam(0)}");
        query = queryBuilder.ToString();
        var courses =
            (await databaseQueryManager.ExecuteQuery<SelectedCourseDTO>(query, parameters.ToArray())).ToList();

        var result = new LinkShareDTO
        {
            Programme = studyPlanDTO.programme_code,
            StudyPlanName = studyPlanDTO.study_plan_name ?? string.Empty,
            Year = studyPlanDTO.year,
            MasterCodes = masterCodes,
            SelectedCourses = courses
        };

        return result;
    }

    public async Task<UniqueBlobDTO> GetUniqueBlobFromPlan(string programme, string year, List<string> masters,
        List<SelectedCourseDTO> selectedCourses,
        string studyPlanName)
    {
        var queryBuilder = new StringBuilder();
        queryBuilder.AppendLine(
            @$"INSERT INTO {STUDY_PLAN}({STUDY_PLAN_NAME}, {YEAR}, {PROGRAMME_CODE})
               VALUES ({QueryParam(0)}, {QueryParam(1)}, {QueryParam(2)})
               RETURNING {STUDY_PLAN_ID}");
        var parameters = new List<object>
        {
            studyPlanName,
            year,
            programme
        };
        var query = queryBuilder.ToString();
        var studyPlanId =
            await Task.Run(() =>
                databaseMutationManager.ExecuteScalar<string>(query, connectionString, parameters.ToArray())) ??
            string.Empty;

        if (studyPlanId == string.Empty)
        {
            return null;
        }

        // Add masters
        queryBuilder.Clear();
        parameters.Clear();
        queryBuilder.AppendLine(
            $"INSERT INTO {STUDY_PLAN_MASTER}({STUDY_PLAN_ID}, {MASTER_CODE}) VALUES");
        queryBuilder.AppendLine($"(\"{studyPlanId}\", {QueryParam(0)})");
        parameters.Add(masters[0]); // Should never fail
        for (var i = 1; i < masters.Count; i++)
        {
            queryBuilder.AppendLine($",(\"{studyPlanId}\", {QueryParam(i)})");
            parameters.Add(masters[i]);
        }

        query = queryBuilder.ToString();
        await Task.Run(() =>
            databaseMutationManager.ExecuteScalar<dynamic>(query, connectionString, parameters.ToArray()));

        // Add courses
        queryBuilder.Clear();
        parameters.Clear();
        queryBuilder.AppendLine(
            $"INSERT INTO {STUDY_PLAN_COURSE}({STUDY_PLAN_ID}, {COURSE_CODE}, {STUDY_YEAR}, {PERIOD_START}, {PERIOD_END}) VALUES");

        var paramCount = 0;
        foreach (var course in selectedCourses)
        {
            var prefix = paramCount != 0 ? "," : string.Empty;
            queryBuilder.AppendLine(
                $"{prefix}(\"{studyPlanId}\", {QueryParam(paramCount++)}, {QueryParam(paramCount++)}, {QueryParam(paramCount++)}, {QueryParam(paramCount++)})");
            parameters.Add(course.course_code);
            parameters.Add(course.study_year);
            parameters.Add(course.period_start);
            parameters.Add(course.period_end);
        }

        query = queryBuilder.ToString();
        await Task.Run(() =>
            databaseMutationManager.ExecuteScalar<dynamic>(query, connectionString, parameters.ToArray()));

        return new UniqueBlobDTO { StudyPlanId = studyPlanId };
    }
}