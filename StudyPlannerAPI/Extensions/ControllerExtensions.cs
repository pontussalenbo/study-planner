using Microsoft.AspNetCore.Mvc;

#pragma warning disable IDE0060

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
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}