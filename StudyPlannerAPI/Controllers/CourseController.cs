using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;
using StudyPlannerAPI.Model.Util;

namespace StudyPlannerAPI.Controllers;

[Route(Constants.ROUTE_COURSE_DATA)]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly ICourseInfoManager courseInfoManager;
    private readonly ILogger<CourseController> logger;

    public CourseController(ICourseInfoManager courseInfoManager, ILogger<CourseController> logger)
    {
        this.courseInfoManager = courseInfoManager;
        this.logger = logger;
    }

    [HttpPost]
    [Consumes(Constants.JSON_CONTENT_TYPE)]
    public async Task<IActionResult> GetCourses([FromBody] CourseParams courseParams)
    {
        if (courseParams.Programme == null
            || courseParams.Year == null
            || !ModelUtil.ValidateYearPattern(courseParams.Year))
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        return await this.PerformEndpointAction(
            async () => await courseInfoManager.GetCourses(courseParams.Programme,
                courseParams.Year, courseParams.Master ?? string.Empty),
            logger);
    }
}