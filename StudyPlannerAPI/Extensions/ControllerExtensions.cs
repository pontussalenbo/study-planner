﻿using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Extensions;

public static class ControllerExtensions
{
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
            return controllerBase.StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}