/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 *
 */

using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Interface for the general information service
/// </summary>
public interface IGeneralInfoManager
{
    /// <summary>
    ///     Get all master programmes at LTH
    /// </summary>
    /// <returns></returns>
    public Task<IActionResult> GetProgrammes();

    /// <summary>
    ///     Get all academic years until now
    /// </summary>
    /// <returns></returns>
    public Task<IActionResult> GetAcademicYears();

    /// <summary>
    ///     Get all class years that LTH have posted masters for
    /// </summary>
    /// <returns></returns>
    public Task<IActionResult> GetClassYears();

    /// <summary>
    ///     Get masters in a programme during a given year
    /// </summary>
    /// <param name="programme"></param>
    /// <param name="year"></param>
    /// <returns></returns>
    public Task<IActionResult> GetMasters(string programme, string year);
}