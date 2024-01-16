/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Result DTO for master requirement validation
/// </summary>
public class MasterValidationResult
{
    /// <summary>
    ///     Master code
    /// </summary>
    [JsonPropertyName(Constants.MASTER)]
    public string Master { get; set; } = string.Empty;

    /// <summary>
    ///     Sum of G1 credits
    /// </summary>
    [JsonPropertyName(Constants.G1_CREDITS)]
    public float G1Credits { get; set; }

    /// <summary>
    ///     Sum of G2 credits
    /// </summary>
    [JsonPropertyName(Constants.G2_CREDITS)]
    public float G2Credits { get; set; }

    /// <summary>
    ///     Sum of advanced credits
    /// </summary>
    [JsonPropertyName(Constants.ADVANCED_CREDITS)]
    public float AdvancedCredits { get; set; }

    /// <summary>
    ///     Is the requirement for this master fulfilled?
    /// </summary>
    [JsonPropertyName(Constants.REQUIREMENTS_FULFILLED)]
    public bool RequirementsFulfilled { get; set; }

    /// <summary>
    ///     List of selected courses appearing in this master
    /// </summary>
    [JsonPropertyName(Constants.SELECTED_COURSES)]
    public List<string> SelectedCourses { get; set; }
}