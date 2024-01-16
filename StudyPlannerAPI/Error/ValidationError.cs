/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿#pragma warning disable IDE1006
namespace StudyPlannerAPI.Error;

/// <summary>
///     Generic record for some sort of validation error
/// </summary>
/// <param name="code"></param>
/// <param name="message"></param>
public record ValidationError(string code, string message);