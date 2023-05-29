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
    private readonly IValidator<StudyPlanParams> linkShareValidator;
    private readonly IValidator<UniqueBlobDTO> uniqueBlobValidator;
    private readonly ILogger<LinkShareController> logger;

    public LinkShareController(ILinkShareManager linkShareManager, ILogger<LinkShareController> logger,
        IValidator<StudyPlanParams> linkShareValidator, IValidator<UniqueBlobDTO> uniqueBlobValidator)
    {
        this.linkShareManager = linkShareManager;
        this.logger = logger;
        this.linkShareValidator = linkShareValidator;
        this.uniqueBlobValidator = uniqueBlobValidator;
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> GetUniqueShareLink([FromBody] StudyPlanParams studyPlanParams)
    {
        var validationResult = await linkShareValidator.ValidateAsync(studyPlanParams);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(async () =>
            {
                var result = await linkShareManager.GetUniqueBlobFromPlan(studyPlanParams.Programme,
                    studyPlanParams.Year,
                    studyPlanParams.MasterCodes,
                    studyPlanParams.SelectedCourses,
                    studyPlanParams.StudyPlanName ?? Constants.STUDY_PLAN_NAME_DEFAULT);
                return new JsonResult(result);
            }, logger);
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
            return await this.PerformEndpointAction(async () =>
            {
                var result = await linkShareManager.GetPlanFromUniqueBlob(uniqueBlobDTO.StudyPlanId);
                return new JsonResult(result);
            }, logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }
}