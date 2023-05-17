using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Controllers.Validation;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Constants.ROUTE_MASTER_CHECK)]
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
    [Consumes(Constants.JSON_CONTENT_TYPE)]
    public async Task<IActionResult> CheckMasterRequirements([FromBody] MasterCheckParams masterCheckParams)
    {
        var validationResult = await validator.ValidateAsync(masterCheckParams);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(
                async () => await masterRequirementValidator.ValidateCourseSelection(masterCheckParams.Programme,
                    masterCheckParams.Year, masterCheckParams.SelectedCourses, masterCheckParams.MasterCodes), logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }
}