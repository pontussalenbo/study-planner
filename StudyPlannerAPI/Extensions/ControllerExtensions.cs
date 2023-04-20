#pragma warning disable IDE0060
using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Extensions;

public static class ControllerExtensions
{
    public static async Task<IActionResult> PerformEndpointAction<T>(this ControllerBase controllerBase,
        Func<Task<T>> action, ILogger logger)
    {
        try
        {
            var result = await action();
            return new JsonResult(result);
        }
        catch (Exception e)
        {
            logger.LogError("Encountered {exception}: {message}", e.GetType().Name, e.Message);
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}