using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Controllers.Validation;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Constants.ROUTE_COURSE_DATA)]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly ICourseInfoManager courseInfoManager;
    private readonly ILogger<CourseController> logger;
    private readonly IValidator<CourseParams> validator;

    public CourseController(ICourseInfoManager courseInfoManager, ILogger<CourseController> logger,
        IValidator<CourseParams> validator)
    {
        this.courseInfoManager = courseInfoManager;
        this.logger = logger;
        this.validator = validator;
    }

    [HttpPost]
    [Consumes(Constants.JSON_CONTENT_TYPE)]
    public async Task<IActionResult> GetCourses([FromBody] CourseParams courseParams)
    {
        var validationResult = await validator.ValidateAsync(courseParams);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(
                async () => await courseInfoManager.GetCourses(courseParams.Programme,
                    courseParams.Year, courseParams.Master ?? string.Empty), logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }
}