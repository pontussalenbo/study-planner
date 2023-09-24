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
    private readonly ILogger<LinkShareController> logger;

    public LinkShareController(ILinkShareManager linkShareManager, ILogger<LinkShareController> logger,
        IValidator<LinkShareParams> linkShareValidator, IValidator<UniqueBlobDTO> uniqueBlobValidator)
    {
        this.linkShareManager = linkShareManager;
        this.logger = logger;
        this.linkShareValidator = linkShareValidator;
        this.uniqueBlobValidator = uniqueBlobValidator;
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> GetUniqueShareLink([FromBody] LinkShareParams linkShareParams)
    {
        var validationResult = await linkShareValidator.ValidateAsync(linkShareParams);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(async () =>
                await linkShareManager.GetUniqueBlobFromPlan(linkShareParams.Programme, linkShareParams.Year,
                    linkShareParams.SelectedCourses,
                    linkShareParams.StudyPlanName ?? Constants.STUDY_PLAN_NAME_DEFAULT,
                    linkShareParams.UniqueBlob ?? string.Empty), logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
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

    [HttpDelete]
    public async Task<IActionResult> DeleteStudyPlanWithId([FromQuery] string studyPlanId)
    {
        // TODO: Fix validation
        return await this.PerformEndpointAction(async () => await linkShareManager.DeleteStudyPlanWithId(studyPlanId),
            logger);
    }
}