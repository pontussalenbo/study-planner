using System.Net.Mime;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Routes.COURSE_DATA)]
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
    [Consumes(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> GetCourses([FromBody] CourseParams courseParams)
    {
        var validationResult = await validator.ValidateAsync(courseParams);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(
                async () =>
                {
                    var result = await courseInfoManager.GetCourses(courseParams.Programme,
                        courseParams.Year, courseParams.Master ?? string.Empty);
                    return new JsonResult(result);
                }, logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }
}