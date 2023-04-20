using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Constants.ROUTE_MASTER_CHECK)]
[ApiController]
public class MasterCheckController : ControllerBase
{
    private readonly ILogger<MasterCheckController> logger;
    private readonly IMasterRequirementValidator masterRequirementValidator;

    public MasterCheckController(IMasterRequirementValidator masterRequirementValidator,
        ILogger<MasterCheckController> logger)
    {
        this.masterRequirementValidator = masterRequirementValidator;
        this.logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> CheckMasterRequirements([FromBody] MasterCheckParams masterCheckParams)
    {
        if (masterCheckParams.Year == string.Empty
            || masterCheckParams.Programme == string.Empty
            || masterCheckParams.SelectedCourses.Count == 0)
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        var result = await this.PerformEndpointAction(
            async () => await masterRequirementValidator.ValidateCourseSelection(masterCheckParams.Programme,
                masterCheckParams.Year, masterCheckParams.SelectedCourses, masterCheckParams.MasterCodes), logger);
        return result;
    }
}