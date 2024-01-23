/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

using System.Net.Mime;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

/// <summary>
///     Controller for master requirements check
/// </summary>
[Route(Routes.MASTER_CHECK)]
[ApiController]
public class MasterCheckController : ControllerBase
{
    private readonly ILogger<MasterCheckController> logger;
    private readonly IMasterRequirementValidator masterRequirementValidator;
    private readonly IValidator<MasterCheckParams> masterCheckParamValidator;
    private readonly IValidator<CustomCourseMinimalDTO> customCourseValidator;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="masterRequirementValidator"></param>
    /// <param name="masterCheckParamValidator"></param>
    /// <param name="customCourseValidator"></param>
    /// <param name="logger"></param>
    public MasterCheckController(IMasterRequirementValidator masterRequirementValidator,
        IValidator<MasterCheckParams> masterCheckParamValidator,
        IValidator<CustomCourseMinimalDTO> customCourseValidator,
        ILogger<MasterCheckController> logger)
    {
        this.masterRequirementValidator = masterRequirementValidator;
        this.masterCheckParamValidator = masterCheckParamValidator;
        this.customCourseValidator = customCourseValidator;
        this.logger = logger;
    }

    /// <summary>
    ///     Check if requirements are fulfilled given specific or all masters
    /// </summary>
    /// <param name="masterCheckParams"></param>
    /// <returns></returns>
    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<MasterValidationResult>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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