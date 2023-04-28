using System.Text;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public class CourseInfoManager : ICourseInfoManager
{
    private readonly IDatabaseManager databaseManager;

    public CourseInfoManager(IDatabaseManager databaseManager)
    {
        this.databaseManager = databaseManager;
    }

    public async Task<IActionResult> GetCourses(string programme, string year)
    {
        var queryBuilder = new StringBuilder();
        var joinStmtBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();
        var parameters = new List<string>();

        queryBuilder.AppendLine(
            @$"SELECT {Columns.COURSE_CODE}, {Columns.COURSE_NAME_SV}, {Columns.COURSE_NAME_EN}, {Columns.CREDITS}, {Columns.LEVEL}
               FROM {Tables.COURSES}");

        if (programme != string.Empty)
        {
            joinStmtBuilder.AppendLine($"JOIN {Tables.COURSE_PROGRAMME} USING ({Columns.COURSE_CODE})");
            condStmtBuilder.AppendLine($"WHERE {Columns.PROGRAMME_CODE} = @p{parameters.Count}");
            parameters.Add(programme);

            var joinTable = Util.YearPatternToTable(year);
            var condColumn = Util.YearPatternToColumn(year);

            joinStmtBuilder.AppendLine($"JOIN {joinTable} USING({Columns.PROGRAMME_CODE}, {Columns.COURSE_CODE})");
            condStmtBuilder.AppendLine($"AND {condColumn} = @p{parameters.Count}");
            parameters.Add(year);

            queryBuilder.AppendLine(joinStmtBuilder.ToString());
            queryBuilder.AppendLine(condStmtBuilder.ToString());
        }

        var query = queryBuilder.ToString();
        var result = await databaseManager.ExecuteQuery<CourseDTO>(query, parameters.ToArray());
        result = await AppendCoursePeriods(result, programme, year);
        return new JsonResult(result);
    }

    public async Task<IActionResult> GetMasterCourses(string master, string programme, string year)
    {
        var queryBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();
        var parameters = new List<string>();

        queryBuilder.AppendLine(
            @$"SELECT {Columns.COURSE_CODE}, {Columns.COURSE_NAME_SV}, {Columns.COURSE_NAME_EN}, {Columns.CREDITS}, {Columns.LEVEL}
               FROM {Tables.PROGRAMME_MASTER}
                   JOIN {Tables.COURSE_MASTER} USING({Columns.MASTER_CODE})
                   JOIN {Tables.COURSES} USING({Columns.COURSE_CODE})");

        condStmtBuilder.AppendLine($"WHERE {Columns.MASTER_CODE} = @p0 AND {Columns.PROGRAMME_CODE} = @p1");
        parameters.Add(master);
        parameters.Add(programme);

        var joinTable = Util.YearPatternToTable(year);
        var condColumn = Util.YearPatternToColumn(year);

        queryBuilder.AppendLine($"JOIN {joinTable} USING({Columns.PROGRAMME_CODE}, {Columns.COURSE_CODE})");
        condStmtBuilder.AppendLine($"AND {condColumn} = @p{parameters.Count}");
        parameters.Add(year);

        queryBuilder.AppendLine(condStmtBuilder.ToString());
        var query = queryBuilder.ToString();
        var result = await databaseManager.ExecuteQuery<CourseDTO>(query, parameters.ToArray());
        result = await AppendCoursePeriods(result, programme, year);
        return new JsonResult(result);
    }

    private async Task<IList<CourseDTO>> AppendCoursePeriods(IList<CourseDTO> courses, string programme,
        string year)
    {
        var queryBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();
        var parameters = new List<string>();

        queryBuilder.AppendLine(
            @$"SELECT *
               FROM {Tables.COURSE_PERIOD}
                   JOIN {Tables.COURSE_PROGRAMME} USING({Columns.COURSE_CODE})");

        var condColumn = Util.YearPatternToColumn(year);

        condStmtBuilder.AppendLine($"WHERE {condColumn} = @p{parameters.Count}");
        parameters.Add(year);

        if (programme != string.Empty)
        {
            condStmtBuilder.AppendLine($"AND {Columns.PROGRAMME_CODE} = @p{parameters.Count}");
            parameters.Add(programme);
        }

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
        var coursePeriods = await databaseManager.ExecuteQuery<CoursePeriodDTO>(query, parameters.ToArray());

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