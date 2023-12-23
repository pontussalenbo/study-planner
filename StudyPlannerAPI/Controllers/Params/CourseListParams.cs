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

using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Controllers.Params;

/// <summary>
///     Parameter DTO for getting course information from a list of course codes
/// </summary>
public class CourseListParams
{
    /// <summary>
    ///     List of course codes
    /// </summary>
    [JsonPropertyName(Constants.COURSE_CODES)]
    public List<string> CourseCodes { get; set; } = new();
}