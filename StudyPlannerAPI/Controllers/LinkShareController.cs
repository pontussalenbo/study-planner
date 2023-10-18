using System.Net.Mime;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

/// <summary>
///     Controller for link sharing feature
/// </summary>
[Route(Routes.LINK_SHARE)]
[ApiController]
public class LinkShareController : ControllerBase
{
    private readonly ILinkShareManager linkShareManager;
    private readonly IValidator<LinkShareParams> linkShareValidator;
    private readonly IValidator<StudyPlanIdResult> studyPlanIdValidator;
    private readonly ILogger<LinkShareController> logger;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="linkShareManager"></param>
    /// <param name="logger"></param>
    /// <param name="linkShareValidator"></param>
    /// <param name="studyPlanIdValidator"></param>
    public LinkShareController(ILinkShareManager linkShareManager, ILogger<LinkShareController> logger,
        IValidator<LinkShareParams> linkShareValidator, IValidator<StudyPlanIdResult> studyPlanIdValidator)
    {
        this.linkShareManager = linkShareManager;
        this.linkShareValidator = linkShareValidator;
        this.studyPlanIdValidator = studyPlanIdValidator;
    }

    /// <summary>
    ///     Creates a study plan associated with a unique id
    /// </summary>
    /// <param name="linkShareParams"></param>
    /// <returns>A study plan id paired with a read-only id</returns>
    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetStudyPlanShareLink([FromBody] LinkShareParams linkShareParams)
    {
        var validationResult = await linkShareValidator.ValidateAsync(linkShareParams);
        if (!validationResult.IsValid)
        {
            return await this.PerformEndpointAction(async () =>
                await linkShareManager.GetIdFromStudyPlan(linkShareParams.Programme, linkShareParams.Year,
                    linkShareParams.SelectedCourses,
                    linkShareParams.StudyPlanName ?? string.Empty,
                    linkShareParams.StudyPlanId ?? string.Empty), logger);
        }

        var allValid = true;
        var errors = new List<ValidationError>();
        foreach (var it in linkShareParams.SelectedCourses)
        {
            var res = await selectedCourseValidator.ValidateAsync(it);
            if (res.IsValid)
            {
                continue;
            }

            allValid = false;
            errors.AddRange(res.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage)).ToList());
        }

        foreach (var it in linkShareParams.CustomCourses)
        {
            var res = await customCourseValidator.ValidateAsync(it);
            if (res.IsValid)
            {
                continue;
            }

            allValid = false;
            errors.AddRange(res.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage)).ToList());
        }

        if (!allValid)
        {
            return BadRequest(errors);
        }

        return await this.PerformEndpointAction(async () =>
            await linkShareManager.GetUniqueBlobFromPlan(linkShareParams.Programme, linkShareParams.Year,
                linkShareParams.SelectedCourses,
                linkShareParams.StudyPlanName ?? Constants.STUDY_PLAN_NAME_DEFAULT,
                linkShareParams.UniqueBlob ?? string.Empty,
                linkShareParams.CustomCourses), logger);
    }

    /// <summary>
    ///     Gets study plan from its unique study plan id
    /// </summary>
    /// <param name="studyPlanId"></param>
    /// <returns>The full study plan, including a field determining whether a read only id was used or not</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetStudyPlanFromId([FromQuery] string studyPlanId)
    {
        var validationResult =
            await studyPlanIdValidator.ValidateAsync(new StudyPlanIdResult { StudyPlanId = studyPlanId });
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(
                async () => await linkShareManager.GetStudyPlanFromId(studyPlanId), logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }

    [HttpGet]
    [Route(Routes.ID)]
    public async Task<IActionResult> GetReadOnlyIdFromId([FromQuery] string studyPlanId)
    {
        return await this.PerformEndpointAction(async () => await linkShareManager.GetReadOnlyIdFromId(studyPlanId),
            logger);
    }
}