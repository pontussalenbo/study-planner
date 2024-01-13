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

namespace StudyPlannerAPI.Error;

internal static class ErrorUtil
{
    public static string InvalidFormat(string param)
    {
        return $"Parameter '{param}' must be formatted correctly!";
    }

    public static string ParamNull(string param)
    {
        return $"Parameter '{param}' may not be null!";
    }

    public static string CountLeqZero(string param)
    {
        return $"Parameter '{param}' must contain at least one element!";
    }

    public static string LeqZero(string param)
    {
        return $"Parameter '{param}' must be a positive number!";
    }

    public static string OneChar(string param)
    {
        return $"Parameter '{param}' must be at least one character!";
    }

    public static string ConfigurationParam(string configurationParam)
    {
        return $"Configuration parameter '{configurationParam}' is not defined!";
    }
}