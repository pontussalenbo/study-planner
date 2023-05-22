using System.Text;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Model.Util;

namespace StudyPlannerAPI.Model;

public class CourseInfoManager : ICourseInfoManager
{
    private readonly IDatabaseQueryManager databaseQueryManager;

    public CourseInfoManager(IDatabaseQueryManager databaseQueryManager, IConfiguration configuration)
    {
        this.databaseQueryManager =
            (IDatabaseQueryManager)DatabaseUtil.ConfigureDatabaseManager(databaseQueryManager, configuration,
                Constants.CONNECTION_STRING);
    }

    public async Task<IActionResult> GetCourses(string programme, string year, string master)
    {
        var queryBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();
        var parameters = new List<string>();

        var table = ModelUtil.YearPatternToTable(year);
        var column = ModelUtil.YearPatternToColumn(year);

        queryBuilder.AppendLine(
            @$"SELECT DISTINCT({Columns.COURSE_CODE}), {Columns.COURSE_NAME_SV}, {Columns.COURSE_NAME_EN}, {Columns.CREDITS}, {Columns.LEVEL}
               FROM {table} JOIN {Tables.COURSES} USING({Columns.COURSE_CODE})");

        condStmtBuilder.AppendLine($"WHERE {Columns.PROGRAMME_CODE} = @p{parameters.Count}");
        parameters.Add(programme);

        condStmtBuilder.AppendLine($"AND {column} = @p{parameters.Count}");
        condStmtBuilder.AppendLine($"AND ({Columns.ELECTABILITY} = '{Constants.ELECTIVE}' OR {Columns.ELECTABILITY} = '{Constants.EXTERNAL_ELECTIVE}')");
        parameters.Add(year);

        if (master != string.Empty)
        {
            condStmtBuilder.AppendLine($"AND {Columns.MASTER_CODE} = @p{parameters.Count}");
            parameters.Add(master);
        }

        queryBuilder.AppendLine(condStmtBuilder.ToString());


        var query = queryBuilder.ToString();
        var result = await databaseQueryManager.ExecuteQuery<CourseDTO>(query, parameters.ToArray());
        result = await AppendCoursePeriods(result, programme, year);
        return new JsonResult(result);
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
            @$"SELECT {Columns.COURSE_CODE}, {Columns.PERIOD_START}, {Columns.PERIOD_END}
               FROM {table}
                   JOIN {joinTable} USING({Columns.COURSE_CODE}, {condColumn})");

        condStmtBuilder.AppendLine($"WHERE {condColumn} = @p{parameters.Count}");
        parameters.Add(year);

        condStmtBuilder.AppendLine($"AND {Columns.PROGRAMME_CODE} = @p{parameters.Count}");
        parameters.Add(programme);

        for (var i = 0; i < courses.Count; i++)
        {
            var op = i == 0 ? "AND (" : "OR";
            condStmtBuilder.AppendLine($"{op} {Columns.COURSE_CODE} = '{courses[i].course_code}'");
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