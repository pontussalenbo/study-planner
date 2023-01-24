using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Controllers
{
    [Route(Constants.ROUTE_COURSE_DATA)]
    [ApiController]
    public class CourseDataController : ControllerBase
    {
        private ILogger<CourseDataController> logger;

        public CourseDataController(ILogger<CourseDataController> logger)
        {
            this.logger = logger;
        }


        // TODO: endpoint, get course catalog (page parameter?)

        // TODO: endpoint, filter course catalog
    }
}
