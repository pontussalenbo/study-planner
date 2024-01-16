/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

/// <summary>
///     Controller for general information
/// </summary>
[Route(Routes.GENERAL_INFO)]
[ApiController]
public class GeneralController : ControllerBase
{
    private readonly IGeneralInfoManager generalInfoManager;
    private readonly ILogger<GeneralController> logger;
    private readonly IValidator<ProgrammeMastersParams> validator;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="generalInfoManager"></param>
    /// <param name="logger"></param>
    /// <param name="validator"></param>
    public GeneralController(IGeneralInfoManager generalInfoManager, ILogger<GeneralController> logger,
        IValidator<ProgrammeMastersParams> validator)
    {
        this.generalInfoManager = generalInfoManager;
        this.logger = logger;
        this.validator = validator;
    }

    /// <summary>
    ///     Gets all master programmes at LTH
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [Route(Routes.PROGRAMMES)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<string>))]
    public async Task<IActionResult> GetProgrammes()
    {
        return await this.PerformEndpointAction(generalInfoManager.GetProgrammes, logger);
    }

    /// <summary>
    ///     Gets all academic years until now
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [Route(Routes.ACADEMIC_YEARS)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<string>))]
    public async Task<IActionResult> GetAcademicYears()
    {
        return await this.PerformEndpointAction(generalInfoManager.GetAcademicYears, logger);
    }

    /// <summary>
    ///     Gets all class years that LTH has put out masters for
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [Route(Routes.CLASS_YEARS)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<string>))]
    public async Task<IActionResult> GetClassYears()
    {
        return await this.PerformEndpointAction(generalInfoManager.GetClassYears, logger);
    }

    /// <summary>
    ///     Gets all masters for a programme during a given year
    /// </summary>
    /// <param name="programme"></param>
    /// <param name="year"></param>
    /// <returns></returns>
    [HttpGet]
    [Route(Routes.MASTERS)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<MasterDTO>))]
    public async Task<IActionResult> GetMastersByProgramme([FromQuery] string programme, [FromQuery] string year)
    {
        var validationResult = await validator.ValidateAsync(new ProgrammeMastersParams
            { Programme = programme, Year = year });
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(async () => await generalInfoManager.GetMasters(programme, year),
                logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }
}