using System.Text;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using static StudyPlannerAPI.Database.Columns;
using static StudyPlannerAPI.Database.Tables;
using static StudyPlannerAPI.Constants;
using static StudyPlannerAPI.Database.DatabaseUtil;

namespace StudyPlannerAPI.Model;

public class CourseInfoManager : ICourseInfoManager
{
    private readonly IDatabaseQueryManager databaseQueryManager;

    public CourseInfoManager(IDatabaseQueryManager databaseQueryManager, IConfiguration configuration)
    {
        this.databaseQueryManager =
            (IDatabaseQueryManager)ConfigureDatabaseManager(databaseQueryManager, configuration,
                CONNECTION_STRING);
    }

    public async Task<IList<CourseDTO>> GetCourses(string programme, string year, string master)
    {
        var queryBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();
        var parameters = new List<string>();

        var table = ModelUtil.YearPatternToTable(year);
        var column = ModelUtil.YearPatternToColumn(year);

        queryBuilder.AppendLine(
            @$"SELECT DISTINCT({COURSE_CODE}), {COURSE_NAME_SV}, {COURSE_NAME_EN}, {CREDITS}, {LEVEL}
               FROM {table} JOIN {COURSES} USING({COURSE_CODE})");

        condStmtBuilder.AppendLine($"WHERE {PROGRAMME_CODE} = {QueryParam(parameters.Count)}");
        parameters.Add(programme);

        condStmtBuilder.AppendLine($"AND {column} = {QueryParam(parameters.Count)}");
        condStmtBuilder.AppendLine(
            $"AND ({ELECTABILITY} = '{ELECTIVE}' OR {ELECTABILITY} = '{EXTERNAL_ELECTIVE}')");
        parameters.Add(year);

        if (master != string.Empty)
        {
            condStmtBuilder.AppendLine($"AND {MASTER_CODE} = {QueryParam(parameters.Count)}");
            parameters.Add(master);
        }

        queryBuilder.AppendLine(condStmtBuilder.ToString());


        var query = queryBuilder.ToString();
        var result = await databaseQueryManager.ExecuteQuery<CourseDTO>(query, parameters.ToArray());
        result = await AppendCoursePeriods(result, programme, year);
        return result;
    }

    private async Task<IList<CourseDTO>> AppendCoursePeriods(IList<CourseDTO> courses, string programme,
        string year)
    {
        var queryBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();
        var parameters = new List<string>();

        var table = ModelUtil.YearPatternToPeriodTable(year);
        var joinTable = ModelUtil.YearPatternToTable(year);
        var condColumn = ModelUtil.YearPatternToColumn(year);

        queryBuilder.AppendLine(
            @$"SELECT {COURSE_CODE}, {PERIOD_START}, {PERIOD_END}
               FROM {table}
                   JOIN {joinTable} USING({COURSE_CODE}, {condColumn})");

        condStmtBuilder.AppendLine($"WHERE {condColumn} = {QueryParam(parameters.Count)}");
        parameters.Add(year);

        condStmtBuilder.AppendLine($"AND {PROGRAMME_CODE} =  {QueryParam(parameters.Count)}");
        parameters.Add(programme);

        for (var i = 0; i < courses.Count; i++)
        {
            var op = i == 0 ? "AND (" : "OR";
            condStmtBuilder.AppendLine($"{op} {COURSE_CODE} = '{courses[i].course_code}'");
            if (i == courses.Count - 1)
            {
                condStmtBuilder.Append(')');
            }
        }

        queryBuilder.AppendLine(condStmtBuilder.ToString());
        var query = queryBuilder.ToString();
        var coursePeriods = await databaseQueryManager.ExecuteQuery<CoursePeriodDTO>(query, parameters.ToArray());

        foreach (var course in courses)
        {
            var periods = coursePeriods.Where(cp => cp.course_code == course.course_code)
                .Select(cp => new PeriodDTO(cp.period_start, cp.period_end));
            foreach (var period in periods)
            {
                course.periods.Add(period);
            }
        }

        return courses;
    }
}