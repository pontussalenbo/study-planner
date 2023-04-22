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
        if (courseParams.Programme == null || !((courseParams.ClassYear == null) ^ (courseParams.AcademicYear == null)))
        {
            return
                new StatusCodeResult(StatusCodes.Status400BadRequest); // Require programme and class xor academic year
        }

        var result = await this.PerformEndpointAction(
            async () => await courseInfoManager.GetCourses(courseParams.Programme, courseParams.ClassYear ?? "",
                courseParams.AcademicYear ?? ""),
            logger);
        return result;
    }

    [HttpPost]
    [Route("master")]
    [Consumes(Constants.JSON_CONTENT_TYPE)]
    public async Task<IActionResult> GetMasterCourses([FromBody] CourseParams courseParams)
    {
        if (courseParams.Master == null || courseParams.Programme == null ||
            !((courseParams.ClassYear == null) ^ (courseParams.AcademicYear == null)))
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest); // Require master and programme
        }

        var result = await this.PerformEndpointAction(
            async () => await courseInfoManager.GetMasterCourses(courseParams.Master, courseParams.Programme,
                courseParams.ClassYear ?? string.Empty, courseParams.AcademicYear ?? string.Empty), logger);
        return result;
    }
}