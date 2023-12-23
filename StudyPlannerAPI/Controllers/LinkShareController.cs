/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 *
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
///     Controller for link sharing feature
/// </summary>
[Route(Routes.LINK_SHARE)]
[ApiController]
public class LinkShareController : ControllerBase
{
    private readonly ILinkShareManager linkShareManager;
    private readonly IValidator<LinkShareParams> linkShareValidator;
    private readonly IValidator<StudyPlanIdResult> studyPlanIdValidator;
    private readonly IValidator<SelectedCourseDTO> selectedCourseValidator;
    private readonly IValidator<CustomCourseDTO> customCourseValidator;
    private readonly ILogger<LinkShareController> logger;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="linkShareManager"></param>
    /// <param name="linkShareValidator"></param>
    /// <param name="studyPlanIdValidator"></param>
    /// <param name="customCourseValidator"></param>
    /// <param name="selectedCourseValidator"></param>
    /// <param name="logger"></param>
    public LinkShareController(ILinkShareManager linkShareManager,
        IValidator<LinkShareParams> linkShareValidator, IValidator<StudyPlanIdResult> studyPlanIdValidator,
        IValidator<CustomCourseDTO> customCourseValidator, IValidator<SelectedCourseDTO> selectedCourseValidator,
        ILogger<LinkShareController> logger)
    {
        this.linkShareManager = linkShareManager;
        this.linkShareValidator = linkShareValidator;
        this.studyPlanIdValidator = studyPlanIdValidator;
        this.customCourseValidator = customCourseValidator;
        this.logger = logger;
        this.selectedCourseValidator = selectedCourseValidator;
    }

    /// <summary>
    ///     Creates a study plan associated with a unique id
    /// </summary>
    /// <param name="linkShareParams"></param>
    /// <returns>A study plan id paired with a read-only id</returns>
    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(StudyPlanIdResult))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetStudyPlanShareLink([FromBody] LinkShareParams linkShareParams)
    {
        var validationResult = await linkShareValidator.ValidateAsync(linkShareParams);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage)));
        }

        var allValid = true;
        var errors = new List<ValidationError>();
        foreach (var it in linkShareParams.SelectedCourses)
        {
            var res = await selectedCourseValidator.ValidateAsync(it);
            if (res.IsValid)
            {
                continue;
            }

            allValid = false;
            errors.AddRange(res.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage)).ToList());
        }

        foreach (var it in linkShareParams.CustomCourses)
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

        return await this.PerformEndpointAction(async () =>
            await linkShareManager.GetIdFromStudyPlan(linkShareParams.Programme, linkShareParams.Year,
                linkShareParams.SelectedCourses,
                linkShareParams.StudyPlanName ?? Constants.STUDY_PLAN_NAME_DEFAULT,
                linkShareParams.StudyPlanId ?? string.Empty,
                linkShareParams.CustomCourses), logger);
    }

    /// <summary>
    ///     Gets study plan from its unique study plan id
    /// </summary>
    /// <param name="studyPlanId"></param>
    /// <returns>The full study plan, including a field determining whether a read only id was used or not</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LinkShareDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetStudyPlanFromId([FromQuery] string studyPlanId)
    {
        var validationResult =
            await studyPlanIdValidator.ValidateAsync(new StudyPlanIdResult { StudyPlanId = studyPlanId });
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(
                async () => await linkShareManager.GetStudyPlanFromId(studyPlanId), logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }

    /// <summary>
    ///     Gets the read only id associated with a given study plan id
    /// </summary>
    /// <param name="studyPlanId"></param>
    /// <returns></returns>
    [Route(Routes.ID)]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(StudyPlanIdResult))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetReadOnlyIdFromId([FromQuery] string studyPlanId)
    {
        return await this.PerformEndpointAction(async () => await linkShareManager.GetReadOnlyIdFromId(studyPlanId),
            logger);
    }
}