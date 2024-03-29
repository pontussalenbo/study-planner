/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

using System.Text.Json.Serialization;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Controllers.Params;

/// <summary>
///     Parameter DTO for link sharing
/// </summary>
public class LinkShareParams
{
    /// <summary>
    ///     Unique study plan id (optional)
    /// </summary>
    [JsonPropertyName(Constants.STUDY_PLAN_ID)]
    public string StudyPlanId { get; set; }

    /// <summary>
    ///     Programme code
    /// </summary>
    [JsonPropertyName(Constants.PROGRAMME)]
    public string Programme { get; set; }

    /// <summary>
    ///     Year
    /// </summary>
    [JsonPropertyName(Constants.YEAR)]
    public string Year { get; set; }

    /// <summary>
    ///     Study plan name (optional)
    /// </summary>
    [JsonPropertyName(Constants.STUDY_PLAN_NAME)]
    public string StudyPlanName { get; set; }

    /// <summary>
    ///     List of selected courses
    /// </summary>
    [JsonPropertyName(Constants.SELECTED_COURSES)]
    public List<SelectedCourseDTO> SelectedCourses { get; set; } = new();

    /// <summary>
    ///     List of custom courses
    /// </summary>
    [JsonPropertyName(Constants.CUSTOM_COURSES)]
    public List<CustomCourseDTO> CustomCourses { get; set; } = new();
}