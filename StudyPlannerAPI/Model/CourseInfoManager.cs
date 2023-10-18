using Microsoft.AspNetCore.Mvc;
using SqlKata;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Default implementation of ICourseInfoManager
/// </summary>
public class CourseInfoManager : ICourseInfoManager
{
    private readonly IDatabaseManager db;
    private readonly ILogger<CourseInfoManager> logger;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="databaseManager"></param>
    /// <param name="configuration"></param>
    /// <param name="logger"></param>
    public CourseInfoManager(IDatabaseManager databaseManager, IConfiguration configuration,
        ILogger<CourseInfoManager> logger)
    {
        db = DatabaseUtil.ConfigureDatabaseManager(databaseManager, configuration, Constants.CONNECTION_STRING);
        this.logger = logger;
    }

    /// <inheritdoc />
    public async Task<IActionResult> GetCoursesByProgrammeAndYear(string programme, string year, List<string> masters)
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

    /// <inheritdoc />
    public async Task<IActionResult> GetCourses(List<string> courseCodes)
    {
        if (courseCodes.Count == 0)
        {
            return new JsonResult(null);
        }

        var query = new Query(Tables.COURSES)
            .Select(Columns.COURSE_CODE, Columns.COURSE_NAME_EN, Columns.COURSE_NAME_SV, Columns.CREDITS,
                Columns.LEVEL);

        query = query.Where(sq =>
        {
            sq = sq.Where(Columns.COURSE_CODE, courseCodes.First());
            return courseCodes.Skip(1)
                .Aggregate(sq, (current, courseCode) => current.OrWhere(Columns.COURSE_CODE, courseCode));
        });

        var queryRes = await db.ExecuteQuery<CourseDTO>(query);
        var result = queryRes.ToDictionary(c => c.course_code, c => c.ToCourseInfoDTO());

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