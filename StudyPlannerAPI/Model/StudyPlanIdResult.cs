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

using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Class for study plan creation result
/// </summary>
public class StudyPlanIdResult
{
    /// <summary>
    ///     Unique study plan id
    /// </summary>
    [JsonPropertyName(Constants.STUDY_PLAN_ID)]
    public string StudyPlanId { get; set; } = string.Empty;

    /// <summary>
    ///     Unique study plan read only id
    /// </summary>
    [JsonPropertyName(Constants.STUDY_PLAN_READ_ONLY_ID)]
    public string StudyPlanReadOnlyId { get; set; } = string.Empty;
}