using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Controllers.Params;
using System.Text;
using StudyPlannerAPI.Database.DTO;
using System.IO.IsolatedStorage;

namespace StudyPlannerAPI.Controllers
{
    [Route(Constants.ROUTE_COURSE_DATA)]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ILogger<CourseController> logger;
        private readonly IDatabaseManager databaseManager;

        public CourseController(ILogger<CourseController> logger, IDatabaseManager databaseManager)
        {
            this.logger = logger;
            this.databaseManager = databaseManager;
        }

        // TODO: Make code not ugly

        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> GetCourses([FromBody] CourseParams courseParams)
        {
            if (courseParams.Programme == null)
            {
                return new StatusCodeResult(StatusCodes.Status400BadRequest);
            }

            var parameters = new List<string>();
            var queryBuilder = new StringBuilder(@"SELECT course_code, course_name_sv, course_name_en, credits, level FROM courses_info ");

            if (courseParams.Programme != null)
            {
                var joinStmtBuilder = new StringBuilder(" JOIN programme_course USING (course_code)");
                var condStmtBuilder = new StringBuilder($" WHERE programme_code = @p{parameters.Count}");
                parameters.Add(courseParams.Programme);
                if (courseParams.Year != null)
                {
                    joinStmtBuilder.Append(" JOIN course_class USING (programme_code, course_code)");
                    condStmtBuilder.Append($" AND class = @p{parameters.Count}");
                    parameters.Add(courseParams.Year);
                }
                queryBuilder.AppendLine(joinStmtBuilder.ToString());
                queryBuilder.AppendLine(condStmtBuilder.ToString());
            }
            var query = queryBuilder.ToString();

            try
            {
                var courses = await databaseManager.GetList<CourseInfoDTO>(query, parameters.ToArray());
                queryBuilder.Clear();
                parameters.Clear();
                queryBuilder.Append(@"SELECT * FROM course_period JOIN programme_course USING(course_code) WHERE 1=1");

                if (courseParams.Year != null)
                {
                    queryBuilder.Append($" AND class = @p{parameters.Count}");
                    parameters.Add(courseParams.Year);
                }
                if (courseParams.Programme != null)
                {
                    queryBuilder.Append($" AND programme_code = @p{parameters.Count}");
                    parameters.Add(courseParams.Programme);
                }

                for (int i = 0; i < courses.Count; i++)
                {
                    string op = i == 0 ? "\nAND (": "\nOR";
                    queryBuilder.Append($" {op} course_code = '{courses[i].course_code}'");
                    if (i == courses.Count - 1)
                    {
                        queryBuilder.Append(')');
                    }
                }
                query = queryBuilder.ToString();
                var coursePeriods = await databaseManager.GetList<CoursePeriodDTO>(query, parameters.ToArray());

                foreach (var course in courses)
                {
                    var periods = coursePeriods.Where(cp => cp.course_code == course.course_code).Select(cp => new PeriodDTO(cp.period_start, cp.period_end));
                    foreach (var period in periods)
                    {
                        course.periods.Add(period);
                    }
                }

                return new JsonResult(courses);
            }
            catch(Exception e)
            {
                logger.LogError("Encountered {exception}: {message}", e.GetType().Name, e.Message);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError); // DB-connection could not be established
            }
        }

        [HttpPost]
        [Route("master")]
        [Consumes("application/json")]
        public async Task<IActionResult> GetMasterCourses([FromBody] CourseParams courseParams)
        {
            if (courseParams.Master == null || courseParams.Programme == null)
            {
                return new StatusCodeResult(StatusCodes.Status400BadRequest); // Must select master and programme
            }

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
            parameters.Add(courseParams.Master);
            parameters.Add(courseParams.Programme);

            if (courseParams.Year != null)
            {
                queryBuilder.Append(" AND class = @p2");
                parameters.Add(courseParams.Year);
            }

            var query = queryBuilder.ToString();
            try
            {
                var result = await databaseManager.GetList<CourseInfoDTO>(query, parameters.ToArray());
                return new JsonResult(result.ToList());
            }
            catch (Exception e)
            {
                logger.LogError("Encountered {exception}: {message}", e.GetType().Name, e.Message);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError); // DB-connection could not be established
            }
        }
    }
}
