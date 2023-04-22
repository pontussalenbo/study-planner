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

    public async Task<IList<CourseInfoDTO>> GetCourses(string programme = "", string classYear = "",
        string academicYear = "")
    {
        var queryBuilder = new StringBuilder();
        var joinStmtBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();
        var parameters = new List<string>();

        queryBuilder.AppendLine("SELECT course_code, course_name_sv, course_name_en, credits, level FROM courses_info");

        if (programme != string.Empty)
        {
            joinStmtBuilder.AppendLine("JOIN programme_course USING (course_code)");
            condStmtBuilder.AppendLine($"WHERE programme_code = @p{parameters.Count}");
            parameters.Add(programme);

            var joinTable = classYear != string.Empty ? "course_class" : "course_year";
            var condColumn = classYear != string.Empty ? "class_year" : "academic_year";
            var parameter = classYear != string.Empty ? classYear : academicYear;

            joinStmtBuilder.AppendLine($"JOIN {joinTable} USING(programme_code, course_code)");
            condStmtBuilder.AppendLine($"AND {condColumn} = @p{parameters.Count}");
            parameters.Add(parameter);

            queryBuilder.AppendLine(joinStmtBuilder.ToString());
            queryBuilder.AppendLine(condStmtBuilder.ToString());
        }

        var query = queryBuilder.ToString();
        var result = await databaseManager.GetList<CourseInfoDTO>(query, parameters.ToArray());
        return await AppendCoursePeriods(result, programme, classYear, academicYear);
    }

    public async Task<IList<CourseInfoDTO>> GetMasterCourses(string master, string programme, string classYear = "",
        string academicYear = "")
    {
        var queryBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();
        var parameters = new List<string>();

        queryBuilder.AppendLine(
            "SELECT course_code, course_name_sv, course_name_en, credits, level FROM programme_master");
        queryBuilder.AppendLine("JOIN master_course USING(master_code) JOIN courses_info USING(course_code)");

        condStmtBuilder.AppendLine("WHERE master_code = @p0 AND programme_code = @p1");
        parameters.Add(master);
        parameters.Add(programme);

        var joinTable = classYear != string.Empty ? "course_class" : "course_year";
        var condColumn = classYear != string.Empty ? "class_year" : "academic_year";
        var parameter = classYear != string.Empty ? classYear : academicYear;

        queryBuilder.AppendLine($"JOIN {joinTable} USING(programme_code, course_code)");
        condStmtBuilder.AppendLine($"AND {condColumn} = @p{parameters.Count}");
        parameters.Add(parameter);

        queryBuilder.AppendLine(condStmtBuilder.ToString());
        var query = queryBuilder.ToString();
        var result = await databaseManager.GetList<CourseInfoDTO>(query, parameters.ToArray());
        return await AppendCoursePeriods(result, programme, classYear, academicYear);
    }

    private async Task<IList<CourseInfoDTO>> AppendCoursePeriods(IList<CourseInfoDTO> courses, string programme,
        string classYear, string academicYear)
    {
        var queryBuilder = new StringBuilder();
        var condStmtBuilder = new StringBuilder();
        var parameters = new List<string>();

        queryBuilder.AppendLine("SELECT * FROM course_period JOIN programme_course USING(course_code)");

        var condColumn = classYear != string.Empty ? "class_year" : "academic_year";
        var parameter = classYear != string.Empty ? classYear : academicYear;

        condStmtBuilder.AppendLine($"WHERE {condColumn} = @p{parameters.Count}");
        parameters.Add(parameter);

        if (programme != string.Empty)
        {
            condStmtBuilder.AppendLine($"AND programme_code = @p{parameters.Count}");
            parameters.Add(programme);
        }

        for (var i = 0; i < courses.Count; i++)
        {
            var op = i == 0 ? "AND (" : "OR";
            condStmtBuilder.AppendLine($"{op} course_code = '{courses[i].course_code}'");
            if (i == courses.Count - 1)
            {
                condStmtBuilder.Append(')');
            }
        }

        queryBuilder.AppendLine(condStmtBuilder.ToString());
        var query = queryBuilder.ToString();
        var coursePeriods = await databaseManager.GetList<CoursePeriodDTO>(query, parameters.ToArray());

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