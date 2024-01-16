/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿namespace StudyPlannerAPI.Error;

internal static class ErrorCodes
{
    public const string INVALID_FORMAT = "invalid_format";
    public const string PARAM_NULL = "param_null";
    public const string COUNT_LEQ_ZERO = "count_leq_zero";
    public const string LEQ_ZERO = "leq_zero";
}