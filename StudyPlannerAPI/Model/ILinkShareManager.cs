/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Interface for the link sharing service
/// </summary>
public interface ILinkShareManager
{
    /// <summary>
    ///     Create a study plan associated with a unique id and read-only id
    /// </summary>
    /// <param name="programme"></param>
    /// <param name="year"></param>
    /// <param name="selectedCourses"></param>
    /// <param name="studyPlanName"></param>
    /// <param name="studyPlanId"></param>
    /// <param name="customCourses"></param>
    /// <returns></returns>
    Task<IActionResult> GetIdFromStudyPlan(string programme, string year,
        List<SelectedCourseDTO> selectedCourses, string studyPlanName, string studyPlanId,
        List<CustomCourseDTO> customCourses);

    /// <summary>
    ///     Gets a study plan given an id
    /// </summary>
    /// <param name="studyPlanId"></param>
    /// <returns></returns>
    Task<IActionResult> GetStudyPlanFromId(string studyPlanId);

    /// <summary>
    ///     Gets the read only id associated with a study plan id
    /// </summary>
    /// <param name="studyPlanId"></param>
    /// <returns></returns>
    Task<IActionResult> GetReadOnlyIdFromId(string studyPlanId);
}