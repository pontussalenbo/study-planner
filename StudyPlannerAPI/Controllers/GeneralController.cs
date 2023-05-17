using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;
using StudyPlannerAPI.Model.Util;

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
        return await this.PerformEndpointAction(generalInfoManager.GetProgrammes, logger);
    }

    [HttpGet]
    [Route("academic_years")]
    public async Task<IActionResult> GetAcademicYears()
    {
        return await this.PerformEndpointAction(generalInfoManager.GetAcademicYears, logger);
    }

    [HttpGet]
    [Route("class_years")]
    public async Task<IActionResult> GetClassYears()
    {
        return await this.PerformEndpointAction(generalInfoManager.GetClassYears, logger);
    }

    [HttpGet]
    [Route("masters")]
    public async Task<IActionResult> GetMastersByProgramme([FromQuery] CourseParams courseParams)
    {
        if (courseParams.Programme == null || courseParams.Year == null ||
            !ModelUtil.IsYearPatternValid(courseParams.Year))
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        return await this.PerformEndpointAction(
            async () => await generalInfoManager.GetMasters(courseParams.Programme, courseParams.Year ?? string.Empty),
            logger);
    }
}