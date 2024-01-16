/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿namespace StudyPlannerAPI.Model;

/// <summary>
///     Interface for the health check service
/// </summary>
public interface IHealthCheckManager
{
    /// <summary>
    ///     Is the api healthy?
    /// </summary>
    bool IsHealthy { get; }
}