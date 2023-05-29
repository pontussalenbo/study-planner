using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Routes.GENERAL_INFO)]
[ApiController]
public class GeneralController : ControllerBase
{
    private readonly IGeneralInfoManager generalInfoManager;
    private readonly ILogger<GeneralController> logger;
    private readonly IValidator<ProgrammeMastersParams> validator;

    public GeneralController(IGeneralInfoManager generalInfoManager, ILogger<GeneralController> logger,
        IValidator<ProgrammeMastersParams> validator)
    {
        this.generalInfoManager = generalInfoManager;
        this.logger = logger;
        this.validator = validator;
    }

    [HttpGet]
    [Route(Routes.PROGRAMMES)]
    public async Task<IActionResult> GetProgrammes()
    {
        return await this.PerformEndpointAction(
            async () => new JsonResult(await generalInfoManager.GetProgrammes()), logger);
    }

    [HttpGet]
    [Route(Routes.ACADEMIC_YEARS)]
    public async Task<IActionResult> GetAcademicYears()
    {
        return await this.PerformEndpointAction(
            async () => new JsonResult(await generalInfoManager.GetAcademicYears()), logger);
    }

    [HttpGet]
    [Route(Routes.CLASS_YEARS)]
    public async Task<IActionResult> GetClassYears()
    {
        return await this.PerformEndpointAction(
            async () => new JsonResult(await generalInfoManager.GetClassYears()), logger);
    }

    [HttpGet]
    [Route(Routes.MASTERS)]
    public async Task<IActionResult> GetMastersByProgramme([FromQuery] ProgrammeMastersParams programmeMasterParams)
    {
        var validationResult = await validator.ValidateAsync(programmeMasterParams);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(
                async () => new JsonResult(await generalInfoManager.GetMasters(programmeMasterParams.Programme,
                    programmeMasterParams.Year)), logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }
}