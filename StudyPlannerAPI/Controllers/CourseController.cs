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
///     Controller for course information
/// </summary>
[Route(Routes.COURSE_DATA)]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly ICourseInfoManager courseInfoManager;
    private readonly ILogger<CourseController> logger;
    private readonly IValidator<CourseParams> validator;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="courseInfoManager"></param>
    /// <param name="logger"></param>
    /// <param name="validator"></param>
    public CourseController(ICourseInfoManager courseInfoManager, ILogger<CourseController> logger,
        IValidator<CourseParams> validator)
    {
        this.courseInfoManager = courseInfoManager;
        this.logger = logger;
        this.validator = validator;
    }

    /// <summary>
    ///     Get course information given specific year, programme and masters
    /// </summary>
    /// <param name="courseParams"></param>
    /// <returns></returns>
    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<CourseDTO>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationError))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetCoursesByProgrammeAndYear([FromBody] CourseParams courseParams)
    {
        var validationResult = await validator.ValidateAsync(courseParams);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(
                async () => await courseInfoManager.GetCoursesByProgrammeAndYear(courseParams.Programme,
                    courseParams.Year, courseParams.MasterCodes), logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }

    /// <summary>
    ///     Gets information about provided courses given their course code
    /// </summary>
    /// <param name="courseCodes"></param>
    /// <returns></returns>
    [HttpPost]
    [Route(Routes.INFO)]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Dictionary<string, CourseInfoDTO>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetCourses([FromBody] CourseCodesParams courseCodes)
    {
        return await this.PerformEndpointAction(async () => await courseInfoManager.GetCourses(courseCodes.CourseCodes),
            logger);
    }
}