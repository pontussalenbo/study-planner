using System.Net.Mime;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Routes.LINK_SHARE)]
[ApiController]
public class LinkShareController : ControllerBase
{
    private readonly ILinkShareManager linkShareManager;
    private readonly IValidator<LinkShareParams> linkShareValidator;
    private readonly IValidator<StudyPlanIdResult> studyPlanIdValidator;
    private readonly ILogger<LinkShareController> logger;

    public LinkShareController(ILinkShareManager linkShareManager, ILogger<LinkShareController> logger,
        IValidator<LinkShareParams> linkShareValidator, IValidator<StudyPlanIdResult> studyPlanIdValidator)
    {
        this.linkShareManager = linkShareManager;
        this.linkShareValidator = linkShareValidator;
        this.studyPlanIdValidator = studyPlanIdValidator;
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
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

    [HttpGet]
    public async Task<IActionResult> GetStudyPlanFromId([FromQuery] StudyPlanIdResult studyPlanIdResult)
    {
        var validationResult = await studyPlanIdValidator.ValidateAsync(studyPlanIdResult);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(
                async () => await linkShareManager.GetStudyPlanFromId(studyPlanIdResult.StudyPlanId), logger);
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