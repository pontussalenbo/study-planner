/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Default implementation for the health check service
/// </summary>
public class HealthCheckManager : IHealthCheckManager
{
    private readonly IConfiguration configuration;
    private readonly ILogger<HealthCheckManager> logger;
    private IDatabaseManager db;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="databaseManager"></param>
    /// <param name="configuration"></param>
    /// <param name="logger"></param>
    public HealthCheckManager(IDatabaseManager databaseManager, IConfiguration configuration,
        ILogger<HealthCheckManager> logger)
    {
        db = DatabaseUtil.ConfigureDatabaseManager(databaseManager, configuration, Constants.CONNECTION_STRING);
        this.configuration = configuration;
        this.logger = logger;
    }

    /// <inheritdoc />
    public bool IsHealthy => CheckHealth();

    private bool CheckHealth()
    {
        db = DatabaseUtil.ConfigureDatabaseManager(db, configuration, Constants.CONNECTION_STRING);
        return db.ValidateConnection();
    }
}