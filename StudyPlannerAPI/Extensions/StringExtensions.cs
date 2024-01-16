/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿using System.Globalization;

namespace StudyPlannerAPI.Extensions;

/// <summary>
///     Naming convention enum
/// </summary>
public enum Convention
{
    /// <summary>
    ///     camelCase
    /// </summary>
    CAMEL_CASE,

    /// <summary>
    ///     PascalCase
    /// </summary>
    PASCAL_CASE,

    /// <summary>
    ///     snake_case
    /// </summary>
    SNAKE_CASE
}

/// <summary>
///     Extensions for strings
/// </summary>
public static class StringExtensions
{
    /// <summary>
    ///     Convert the provided string to the camelCase format
    /// </summary>
    /// <param name="value"></param>
    /// <param name="inputConvention"></param>
    /// <returns></returns>
    public static string ToCamelCase(this string value, Convention inputConvention = Convention.SNAKE_CASE)
    {
        return inputConvention switch
        {
            Convention.SNAKE_CASE => value.SnakeToCamel(),
            Convention.PASCAL_CASE => value.PascalToCamel(),
            Convention.CAMEL_CASE => value,
            _ => string.Empty
        };
    }

    private static string SnakeToCamel(this string value)
    {
        var words = value.Split('_');
        if (words.Length == 0)
        {
            return value;
        }

        var ti = CultureInfo.CurrentCulture.TextInfo;
        var camelCase = ti.ToLower(words[0]);

        for (var i = 1; i < words.Length; i++)
        {
            camelCase += ti.ToTitleCase(words[i]);
        }

        return camelCase;
    }

    private static string PascalToCamel(this string value)
    {
        if (value.Length == 0)
        {
            return value;
        }

        var ti = CultureInfo.CurrentUICulture.TextInfo;
        value = ti.ToLower(value[0]) + value.Skip(1).ToString();
        return value;
    }
}