using Microsoft.AspNetCore.Mvc;
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
        var result = await this.PerformEndpointAction(async () => await generalInfoManager.GetProgrammes(), logger);
        return result;
    }

    [HttpGet]
    [Route("academicYear")]
    public async Task<IActionResult> GetAcademicYears()
    {
        var result = await this.PerformEndpointAction(async () => await generalInfoManager.GetAcademicYears(), logger);
        return result;
    }

    [HttpGet]
    [Route("classYear")]
    public async Task<IActionResult> GetClassYears()
    {
        var result = await this.PerformEndpointAction(async () => await generalInfoManager.GetClassYears(), logger);
        return result;
    }
}