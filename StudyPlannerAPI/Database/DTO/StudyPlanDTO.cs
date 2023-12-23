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

internal class StudyPlanDTO
{
    [JsonPropertyName(Constants.STUDY_PLAN_NAME)]
    public string study_plan_name { get; set; } = string.Empty;

    [JsonPropertyName(Constants.PROGRAMME_CODE)]
    public string programme_code { get; set; } = string.Empty;

    public string year { get; set; } = string.Empty;
}