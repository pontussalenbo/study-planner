/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 *
 */

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