using System.Net.Mime;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Database.DTO;
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
    private readonly IValidator<UniqueBlobDTO> uniqueBlobValidator;
    private readonly IValidator<SelectedCourseDTO> selectedCourseValidator;
    private readonly IValidator<CustomCourseDTO> customCourseValidator;
    private readonly ILogger<LinkShareController> logger;

    public LinkShareController(ILinkShareManager linkShareManager, IValidator<LinkShareParams> linkShareValidator,
        IValidator<UniqueBlobDTO> uniqueBlobValidator, IValidator<CustomCourseDTO> customCourseValidator,
        IValidator<SelectedCourseDTO> selectedCourseValidator, ILogger<LinkShareController> logger)
    {
        this.linkShareManager = linkShareManager;
        this.linkShareValidator = linkShareValidator;
        this.uniqueBlobValidator = uniqueBlobValidator;
        this.selectedCourseValidator = selectedCourseValidator;
        this.customCourseValidator = customCourseValidator;
        this.logger = logger;
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> GetUniqueShareLink([FromBody] LinkShareParams linkShareParams)
    {
        var validationResult = await linkShareValidator.ValidateAsync(linkShareParams);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage)));
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
    public async Task<IActionResult> GetStudyPlanFromUniqueBlob([FromQuery] UniqueBlobDTO uniqueBlobDTO)
    {
        var validationResult = await uniqueBlobValidator.ValidateAsync(uniqueBlobDTO);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(
                async () => await linkShareManager.GetPlanFromUniqueBlob(uniqueBlobDTO.StudyPlanId), logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }
}