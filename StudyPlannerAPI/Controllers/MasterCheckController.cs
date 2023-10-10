using System.Net.Mime;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Routes.MASTER_CHECK)]
[ApiController]
public class MasterCheckController : ControllerBase
{
    private readonly ILogger<MasterCheckController> logger;
    private readonly IMasterRequirementValidator masterRequirementValidator;
    private readonly IValidator<MasterCheckParams> masterCheckParamValidator;
    private readonly IValidator<CustomCourseMinimalDTO> customCourseValidator;

    public MasterCheckController(IMasterRequirementValidator masterRequirementValidator,
        IValidator<MasterCheckParams> masterCheckParamValidator,
        IValidator<CustomCourseMinimalDTO> customCourseValidator,
        ILogger<MasterCheckController> logger)
    {
        this.masterRequirementValidator = masterRequirementValidator;
        this.masterCheckParamValidator = masterCheckParamValidator;
        this.logger = logger;
        this.customCourseValidator = customCourseValidator;
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> CheckMasterRequirements([FromBody] MasterCheckParams masterCheckParams)
    {
        var validationResult = await masterCheckParamValidator.ValidateAsync(masterCheckParams);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage)));
        }

        var allValid = true;
        var errors = new List<ValidationError>();
        foreach (var it in masterCheckParams.CustomCourses)
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

        return await this.PerformEndpointAction(
            async () => await masterRequirementValidator.ValidateCourseSelection(masterCheckParams.Programme,
                masterCheckParams.Year, masterCheckParams.SelectedCourses, masterCheckParams.MasterCodes,
                masterCheckParams.CustomCourses), logger);
    }
}