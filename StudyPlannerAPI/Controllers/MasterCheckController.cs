using System.Net.Mime;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
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
    private readonly IValidator<MasterCheckParams> validator;

    public MasterCheckController(IMasterRequirementValidator masterRequirementValidator,
        IValidator<MasterCheckParams> validator, ILogger<MasterCheckController> logger)
    {
        this.masterRequirementValidator = masterRequirementValidator;
        this.validator = validator;
        this.logger = logger;
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    public async Task<IActionResult> CheckMasterRequirements([FromBody] MasterCheckParams masterCheckParams)
    {
        var validationResult = await validator.ValidateAsync(masterCheckParams);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(
                async () =>
                {
                    var result = await masterRequirementValidator.ValidateCourseSelection(masterCheckParams.Programme,
                        masterCheckParams.Year, masterCheckParams.SelectedCourses, masterCheckParams.MasterCodes);
                    return new JsonResult(result);
                }, logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }
}