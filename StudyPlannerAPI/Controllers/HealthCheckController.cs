using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Routes.HEALTH_CHECK)]
[ApiController]
public class HealthCheckController : ControllerBase
{
    private readonly IHealthCheckManager healthCheckManager;

    public HealthCheckController(IHealthCheckManager healthCheckManager)
    {
        this.healthCheckManager = healthCheckManager;
    }

    [HttpGet]
    public IActionResult GetHealthStatus()
    {
        return healthCheckManager.IsHealthy
            ? Ok()
            : StatusCode(StatusCodes.Status500InternalServerError);
    }
}