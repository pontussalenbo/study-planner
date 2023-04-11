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
            string query = @"SELECT * FROM courses_info";
            // TODO: Adapt to present params
            string joinString = string.Empty;
            string conditionString = " WHERE 1=1 ";
            if (courseParams.Programme != null)
            {
                joinString += " JOIN programme_course USING (course_code)";
                conditionString += " AND programme_code = @p0";
                p.Add(courseParams.Programme);
                if (courseParams.Year != null)
                {
                    joinString += " JOIN course_class USING (programme_code, course_code)";
                    conditionString += " AND class = @p1";
                    p.Add(courseParams.Year);
                }
            }
            query = query + joinString + conditionString;
            
            logger.LogInformation($"Query: {query}");
            var result = databaseManager.GetEnumerable<CourseInfoSerializable>(query, p.ToArray());


            return new JsonResult(result.ToList());
        }

        // TODO: endpoint, get course catalog (page parameter?)

        // TODO: endpoint, filter course catalog
    }
}
