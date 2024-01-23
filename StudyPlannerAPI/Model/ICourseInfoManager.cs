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

namespace StudyPlannerAPI.Model;

/// <summary>
///     Interface for the course info service
/// </summary>
public interface ICourseInfoManager
{
    /// <summary>
    ///     Get courses for a programme during a given year
    /// </summary>
    /// <param name="programme"></param>
    /// <param name="year"></param>
    /// <param name="master"></param>
    /// <returns></returns>
    Task<IActionResult> GetCoursesByProgrammeAndYear(string programme, string year, List<string> master);

    /// <summary>
    ///     Get courses given their course codes
    /// </summary>
    /// <param name="courseCodes"></param>
    /// <returns></returns>
    Task<IActionResult> GetCourses(List<string> courseCodes);
}