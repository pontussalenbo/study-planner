using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Controllers.Params;
using System.Data.SQLite;

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

        [HttpPost]
        [Consumes("application/json")]
        public IActionResult GetCourses([FromBody] CourseParams courseParams)
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
                
            try
            {
                var result = databaseManager.GetEnumerable<CourseInfoSerializable>(query, p.ToArray());
                return new JsonResult(result.ToList());
            }
            catch (Exception e)
            {
                logger.LogError("Encountered {exception}: {message}", e.GetType().Name, e.Message);
                return new StatusCodeResult(500); // DB-connection could not be established
            }
        }

        [HttpPost]
        [Route("master")]
        [Consumes("application/json")]
        public IActionResult GetMasterCourses([FromBody] CourseParams courseParams)
        {

            if (courseParams.Master == null || courseParams.Programme == null)
            {
                return new StatusCodeResult(400); // Must select master and programme
            }

            List<string> parameters = new();

            string query =
                @"
                SELECT course_code, course_name_sv, course_name_en, credits, level
                FROM programme_master
                     JOIN master_course USING(master_code)
                     JOIN courses_info USING(course_code)
                     JOIN course_class USING(programme_code, course_code)
                WHERE master_code = @p0
                      AND programme_code = @p1
                ";
            parameters.Add(courseParams.Master);
            parameters.Add(courseParams.Programme);

            if (courseParams.Year != null)
            {
                query += " AND class = @p2";
                parameters.Add(courseParams.Year);
            }

            var result = databaseManager.GetEnumerable<CourseInfoSerializable>(query, parameters.ToArray());
            return new JsonResult(result.ToList());
        }

        // TODO: endpoint, get course catalog (page parameter?)

        // TODO: endpoint, filter course catalog
    }
}
