using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Constants.ROUTE_COURSE_DATA)]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly ICourseInfoManager courseInfoManager;
    private readonly ILogger<CourseController> logger;

    public CourseController(ILogger<CourseController> logger, ICourseInfoManager courseInfoManager)
    {
        this.logger = logger;
        this.courseInfoManager = courseInfoManager;
    }

    [HttpPost]
    [Consumes(Constants.JSON_CONTENT_TYPE)]
    public async Task<IActionResult> GetCourses([FromBody] CourseParams courseParams)
    {
        if (courseParams.Programme == null || courseParams.Year == null)
        {
            return
                new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        if (courseParams.Master == null)
        {
            return await this.PerformEndpointAction(
                async () => await courseInfoManager.GetCourses(courseParams.Programme,
                    courseParams.Year ?? string.Empty),
                logger);
        }

        return await this.PerformEndpointAction(
            async () => await courseInfoManager.GetMasterCourses(courseParams.Master, courseParams.Programme,
                courseParams.Year ?? string.Empty), logger);
    }
}