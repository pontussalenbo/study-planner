using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Controllers.Validation;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Constants.ROUTE_LINK_SHARE)]
[ApiController]
public class LinkShareController : ControllerBase
{
    private readonly ILinkShareManager linkShareManager;
    private readonly ILogger<LinkShareController> logger;
    private readonly IValidator<LinkShareParams> validator;

    public LinkShareController(ILinkShareManager linkShareManager, ILogger<LinkShareController> logger,
        IValidator<LinkShareParams> validator)
    {
        this.linkShareManager = linkShareManager;
        this.logger = logger;
        this.validator = validator;
    }

    [HttpPost]
    public async Task<IActionResult> GetUniqueShareLink([FromBody] LinkShareParams linkShareParams)
    {
        var validationResult = await validator.ValidateAsync(linkShareParams);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(async () =>
                await linkShareManager.GetUniqueBlobFromPlan(linkShareParams.Programme, linkShareParams.Year,
                    linkShareParams.MasterCodes,
                    linkShareParams.SelectedCourses,
                    linkShareParams.StudyPlanName ?? Constants.STUDY_PLAN_NAME_DEFAULT), logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }

    [HttpGet]
    public async Task<IActionResult> GetStudyPlanFromUniqueBlob([FromQuery] UniqueBlobDTO uniqueBlobDTO)
    {
        if (uniqueBlobDTO.StudyPlanId == null)
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        return await this.PerformEndpointAction(
            async () => await linkShareManager.GetPlanFromUniqueBlob(uniqueBlobDTO.StudyPlanId), logger);
    }
}