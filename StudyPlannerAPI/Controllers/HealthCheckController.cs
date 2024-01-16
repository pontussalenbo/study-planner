using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

/// <summary>
///     Controller for the health check service
/// </summary>
[Route(Routes.HEALTH_CHECK)]
[ApiController]
public class HealthCheckController : ControllerBase
{
    private readonly IHealthCheckManager healthCheckManager;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="healthCheckManager"></param>
    public HealthCheckController(IHealthCheckManager healthCheckManager)
    {
        this.healthCheckManager = healthCheckManager;
    }

    /// <summary>
    ///     Get the health of the api
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetHealthStatus()
    {
        return healthCheckManager.IsHealthy
            ? new StatusCodeResult(StatusCodes.Status200OK)
            : new StatusCodeResult(StatusCodes.Status500InternalServerError);
    }
}