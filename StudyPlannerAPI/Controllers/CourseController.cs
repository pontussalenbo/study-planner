using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Controllers.Params;

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

        [HttpGet]
        [Consumes("application/json")]
        public IActionResult GetCourses([FromQuery] CourseParams courseParams)
        {
            List<string> p = new();
            string query = @"SELECT course_code, course_name_sv, course_name_en, credits, level FROM courses_info";
            // TODO: Adapt to present params
            string joinString = string.Empty;
            string conditionString = " WHERE 1=1 ";
            if (courseParams.Programme != null)
            {
                joinString += " JOIN programme_course USING (course_code)";
                conditionString += $" AND programme_code = @p{p.Count}";
                p.Add(courseParams.Programme);
                if (courseParams.Year != null)
                {
                    joinString += " JOIN course_class USING (programme_code, course_code)";
                    conditionString += $" AND class = @p{p.Count}";
                    p.Add(courseParams.Year);
                }
            }
            query = query + joinString + conditionString;

            var result = databaseManager.GetEnumerable<CourseInfoSerializable>(query, p.ToArray());
            return new JsonResult(result.ToList());
        }

        [HttpGet]
        [Route("master")]
        [Consumes("application/json")]
        public IActionResult GetMasterCourses([FromQuery] CourseParams courseParams)
        {

            if (courseParams.Master == null || courseParams.Programme == null || courseParams.Year == null)
            {
                return new StatusCodeResult(400);
            }

            List<string> p = new();

            // TODO: make it not require class year

            string query =
                @"
                SELECT course_code, course_name_sv, course_name_en, credits, level
                FROM programme_master
                JOIN master_course USING(master_code)
                JOIN courses_info USING(course_code)
                JOIN course_class USING(programme_code, course_code)
                WHERE master_code = @p0 AND programme_code = @p1 AND class = @p2;
                ";
            p.Add(courseParams.Master);
            p.Add(courseParams.Programme);
            p.Add(courseParams.Year);

            var result = databaseManager.GetEnumerable<CourseInfoSerializable>(query, p.ToArray());
            return new JsonResult(result.ToList());
        }

        // TODO: endpoint, get course catalog (page parameter?)

        // TODO: endpoint, filter course catalog
    }
}
