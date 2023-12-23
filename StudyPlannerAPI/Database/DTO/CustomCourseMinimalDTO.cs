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

#pragma warning disable IDE1006

namespace StudyPlannerAPI.Database.DTO;

/// <summary>
///     Data transfer object for custom courses with minimal info for master check
/// </summary>
public class CustomCourseMinimalDTO
{
    /// <summary>
    ///     Course code
    /// </summary>
    [JsonPropertyName(Constants.COURSE_CODE)]
    public string course_code { get; set; } = string.Empty;

    /// <summary>
    ///     Level
    /// </summary>
    [JsonPropertyName(Constants.LEVEL)]
    public string level { get; set; } = string.Empty;

    /// <summary>
    ///     Credits
    /// </summary>
    [JsonPropertyName(Constants.CREDITS)]
    public float credits { get; set; } = -1;
}