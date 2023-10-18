﻿using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

/// <summary>
///     Data transfer object for a selected course in a study plan
/// </summary>
public class SelectedCourseDTO
{
    /// <summary>
    ///     Course code
    /// </summary>
    [JsonPropertyName(Constants.COURSE_CODE)]
    public string course_code { get; set; } = string.Empty;

    /// <summary>
    ///     Study year
    /// </summary>
    [JsonPropertyName(Constants.STUDY_YEAR)]
    public int study_year { get; set; } = -1;

    /// <summary>
    ///     Start period
    /// </summary>
    [JsonPropertyName(Constants.PERIOD_START)]
    public int period_start { get; set; } = 0;

    /// <summary>
    ///     End period
    /// </summary>
    [JsonPropertyName(Constants.PERIOD_END)]
    public int period_end { get; set; } = 0;
}