/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Interface for the master requirement validation service
/// </summary>
public interface IMasterRequirementValidator
{
    /// <summary>
    ///     Validate master requirements for a given study plan
    /// </summary>
    /// <param name="programme"></param>
    /// <param name="year"></param>
    /// <param name="selectedCourses"></param>
    /// <param name="masterCodes"></param>
    /// <param name="customCourses"></param>
    /// <returns></returns>
    Task<IActionResult> ValidateCourseSelection(string programme, string year, List<string> selectedCourses,
        List<string> masterCodes, List<CustomCourseMinimalDTO> customCourses);
}