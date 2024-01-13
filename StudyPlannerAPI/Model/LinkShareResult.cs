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
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

internal class LinkShareResult
{
    [JsonPropertyName(Constants.STUDY_PLAN_READ_ONLY_ID)]
    public string StudyPlanReadOnlyId { get; set; } = string.Empty;

    [JsonPropertyName(Constants.PROGRAMME)]
    public string Programme { get; set; } = string.Empty;

    [JsonPropertyName(Constants.STUDY_PLAN_NAME)]
    public string StudyPlanName { get; set; } = string.Empty;

    [JsonPropertyName(Constants.YEAR)]
    public string Year { get; set; } = string.Empty;

    [JsonPropertyName(Constants.IS_READ_ONLY)]
    public bool IsReadOnly { get; set; } = false;

    [JsonPropertyName(Constants.SELECTED_COURSES)]
    public List<SelectedCourseDTO> SelectedCourses { get; set; } = new();
}