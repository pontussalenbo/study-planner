using System.Text;
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

    public async Task<IList<CourseInfoDTO>> GetCourses(string programme = "", string year = "")
    {
        var parameters = new List<string>();
        var queryBuilder =
            new StringBuilder(@"SELECT course_code, course_name_sv, course_name_en, credits, level FROM courses_info ");
        if (programme != string.Empty)
        {
            var joinStmtBuilder = new StringBuilder(" JOIN programme_course USING (course_code)");
            var condStmtBuilder = new StringBuilder($" WHERE programme_code = @p{parameters.Count}");
            parameters.Add(programme);
            if (year != string.Empty)
            {
                joinStmtBuilder.Append(" JOIN course_class USING (programme_code, course_code)");
                condStmtBuilder.Append($" AND class = @p{parameters.Count}");
                parameters.Add(year);
            }

            queryBuilder.AppendLine(joinStmtBuilder.ToString());
            queryBuilder.AppendLine(condStmtBuilder.ToString());
        }

        var query = queryBuilder.ToString();
        var result = await databaseManager.GetList<CourseInfoDTO>(query, parameters.ToArray());
        return await AppendCoursePeriods(result, programme, year);
    }

    public async Task<IList<CourseInfoDTO>> GetMasterCourses(string master, string programme, string year = "")
    {
        var parameters = new List<string>();
        var queryBuilder = new StringBuilder(@"
                SELECT course_code, course_name_sv, course_name_en, credits, level
                FROM programme_master
                     JOIN master_course USING(master_code)
                     JOIN courses_info USING(course_code)
                     JOIN course_class USING(programme_code, course_code)
                WHERE master_code = @p0
                      AND programme_code = @p1
                ");
        parameters.Add(master);
        parameters.Add(programme);

        if (year != string.Empty)
        {
            queryBuilder.Append(" AND class = @p2");
            parameters.Add(year);
        }

        var query = queryBuilder.ToString();
        var result = await databaseManager.GetList<CourseInfoDTO>(query, parameters.ToArray());
        return await AppendCoursePeriods(result, programme, year);
    }

    private async Task<IList<CourseInfoDTO>> AppendCoursePeriods(IList<CourseInfoDTO> courses, string programme,
        string year)
    {
        var parameters = new List<string>();
        var queryBuilder =
            new StringBuilder(@"SELECT * FROM course_period JOIN programme_course USING(course_code) WHERE 1 = 1");

        if (year != string.Empty)
        {
            queryBuilder.Append($" AND class = @p{parameters.Count}");
            parameters.Add(year);
        }

        if (programme != string.Empty)
        {
            queryBuilder.Append($" AND programme_code = @p{parameters.Count}");
            parameters.Add(programme);
        }

        for (var i = 0; i < courses.Count; i++)
        {
            var op = i == 0 ? "AND (" : "OR";
            queryBuilder.Append($" {op} course_code = '{courses[i].course_code}'");
            if (i == courses.Count - 1)
            {
                queryBuilder.Append(')');
            }
        }

        var query = queryBuilder.ToString();
        var coursePeriods = await databaseManager.GetList<CoursePeriodDTO>(query, parameters.ToArray());

        foreach (var course in courses)
        {
            var periods = coursePeriods.Where(cp => cp.course_code == course.course_code)
                .Select(cp => new PeriodDTO(cp.period_start, cp.period_end));
            foreach (var period in periods) course.periods.Add(period);
        }

        return courses;
    }
}