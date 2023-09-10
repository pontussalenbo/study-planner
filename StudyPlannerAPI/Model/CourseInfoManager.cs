using Microsoft.AspNetCore.Mvc;
using SqlKata;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Model.Util;

namespace StudyPlannerAPI.Model;

public class CourseInfoManager : ICourseInfoManager
{
    private readonly IDatabaseManager db;
    private readonly ILogger<CourseInfoManager> logger;

    public CourseInfoManager(IDatabaseManager databaseManager, IConfiguration configuration,
        ILogger<CourseInfoManager> logger)
    {
        db = DatabaseUtil.ConfigureDatabaseManager(databaseManager, configuration, Constants.CONNECTION_STRING);
        this.logger = logger;
    }

    public async Task<IActionResult> GetCourses(string programme, string year, List<string> masters)
    {
        var table = ModelUtil.YearPatternToTable(year);
        var column = ModelUtil.YearPatternToColumn(year);
        var query = new Query(table)
            .Join(Tables.COURSES, $"{Tables.COURSES}.{Columns.COURSE_CODE}", $"{table}.{Columns.COURSE_CODE}")
            .Select($"{table}.{Columns.COURSE_CODE}").Distinct()
            .Select(Columns.COURSE_NAME_EN, Columns.COURSE_NAME_SV, Columns.CREDITS, Columns.LEVEL)
            .Where(Columns.PROGRAMME_CODE, programme)
            .Where(column, year)
            .Where(q =>
                q.Where(Columns.ELECTABILITY, Constants.ELECTIVE)
                    .OrWhere(Columns.ELECTABILITY, Constants.EXTERNAL_ELECTIVE));

        if (masters.Count > 0)
        {
            query = query.Where(sq =>
            {
                sq = sq.Where(Columns.MASTER_CODE, masters.First());
                return masters.Skip(1).Aggregate(sq,
                    (current, master) => current.OrWhere(Columns.MASTER_CODE, master));
            });
        }

        var result = await db.ExecuteQuery<CourseDTO>(query);
        result = await AppendCoursePeriods(result, programme, year);
        return new JsonResult(result);
    }

    private async Task<List<CourseDTO>> AppendCoursePeriods(List<CourseDTO> courses, string programme,
        string year)
    {
        if (courses.Count == 0)
        {
            return courses;
        }

        var table = ModelUtil.YearPatternToPeriodTable(year);
        var joinTable = ModelUtil.YearPatternToTable(year);
        var condColumn = ModelUtil.YearPatternToColumn(year);

        var query = new Query(table)
            .Join(joinTable, j =>
                j.On($"{joinTable}.{Columns.COURSE_CODE}", $"{table}.{Columns.COURSE_CODE}")
                    .On($"{joinTable}.{condColumn}", $"{table}.{condColumn}")
            )
            .Select($"{table}.{Columns.COURSE_CODE}", Columns.PERIOD_START, Columns.PERIOD_END)
            .Where($"{table}.{condColumn}", year)
            .Where(Columns.PROGRAMME_CODE, programme);

        query = query.Where(q =>
        {
            var col = $"{table}.{Columns.COURSE_CODE}";
            q = q.Where(col, courses.First().course_code);
            return courses.Skip(1).Aggregate(q,
                (current, courseCode) => current.OrWhere(col, courseCode.course_code));
        });

        var coursePeriods = await db.ExecuteQuery<CoursePeriodDTO>(query);
        foreach (var course in courses)
        {
            var periods = coursePeriods.Where(cp => cp.course_code == course.course_code)
                .Select(cp => new PeriodDTO(cp.period_start, cp.period_end));
            course.periods.UnionWith(periods);
        }

        return courses;
    }
}