/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Extensions;

/// <summary>
///     Extensions for controllers
/// </summary>
public static class ControllerExtensions
{
    /// <summary>
    ///     Perform and endpoint action and log potential errors
    /// </summary>
    /// <param name="controllerBase"></param>
    /// <param name="action"></param>
    /// <param name="logger"></param>
    /// <returns></returns>
    public static async Task<IActionResult> PerformEndpointAction(this ControllerBase controllerBase,
        Func<Task<IActionResult>> action, ILogger logger)
    {
        try
        {
            return await action();
        }
        catch (Exception e)
        {
            logger.LogError("Encountered {exception}: {message}", e.GetType().Name, e.Message);
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}