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

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

/// <summary>
///     Data transfer object for master info
/// </summary>
public class MasterDTO
{
    /// <summary>
    ///     Master code
    /// </summary>
    [JsonPropertyName(Constants.MASTER_CODE)]
    public string master_code { get; set; } = string.Empty;

    /// <summary>
    ///     Master name in Swedish
    /// </summary>
    [JsonPropertyName(Constants.MASTER_NAME_SV)]
    public string master_name_sv { get; set; } = string.Empty;

    /// <summary>
    ///     Master name in English
    /// </summary>
    [JsonPropertyName(Constants.MASTER_NAME_EN)]
    public string master_name_en { get; set; } = string.Empty;
}