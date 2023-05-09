﻿using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;
using StudyPlannerAPI.Model.Util;

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
    [Consumes(Constants.JSON_CONTENT_TYPE)]
    public async Task<IActionResult> CheckMasterRequirements([FromBody] MasterCheckParams masterCheckParams)
    {
        if (masterCheckParams.Programme == null
            || masterCheckParams.SelectedCourses.Count == 0
            || masterCheckParams.Year == null
            || !ModelUtil.ValidateYearPattern(masterCheckParams.Year))
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        return await this.PerformEndpointAction(
            async () => await masterRequirementValidator.ValidateCourseSelection(masterCheckParams.Programme,
                masterCheckParams.Year ?? string.Empty,
                masterCheckParams.SelectedCourses, masterCheckParams.MasterCodes), logger);
    }
}