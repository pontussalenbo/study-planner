using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Constants.ROUTE_GENERAL_INFO)]
[ApiController]
public class GeneralController : ControllerBase
{
    private readonly IGeneralInfoManager generalInfoManager;
    private readonly ILogger<GeneralController> logger;

    public GeneralController(IGeneralInfoManager generalInfoManager, ILogger<GeneralController> logger)
    {
        this.generalInfoManager = generalInfoManager;
        this.logger = logger;
    }

    [HttpGet]
    [Route("programmes")]
    public async Task<IActionResult> GetProgrammes()
    {
        var result = await this.PerformEndpointAction(generalInfoManager.GetProgrammes, logger);
        return result;
    }

    [HttpGet]
    [Route("academic_years")]
    public async Task<IActionResult> GetAcademicYears()
    {
        var result = await this.PerformEndpointAction(generalInfoManager.GetAcademicYears, logger);
        return result;
    }

    [HttpGet]
    [Route("class_years")]
    public async Task<IActionResult> GetClassYears()
    {
        var result = await this.PerformEndpointAction(generalInfoManager.GetClassYears, logger);
        return result;
    }

    [HttpGet]
    [Route("masters")]
    public async Task<IActionResult> GetMastersByProgramme([FromQuery] CourseParams courseParams)
    {
        if (courseParams.Programme == null || courseParams.Year == null)
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        var result =
            await this.PerformEndpointAction(
                async () => await generalInfoManager.GetMasters(courseParams.Programme,
                    courseParams.Year ?? string.Empty),
                logger);
        return result;
    }
}