/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

using System.Configuration;
using StudyPlannerAPI.Error;

namespace StudyPlannerAPI.Database;

/// <summary>
///     Utility functions for the database service
/// </summary>
public static class DatabaseUtil
{
    /// <summary>
    ///     Configure the connection string for the database service
    /// </summary>
    /// <param name="databaseManager"></param>
    /// <param name="configuration"></param>
    /// <param name="connectionStringParam"></param>
    /// <returns></returns>
    /// <exception cref="ConfigurationErrorsException"></exception>
    public static IDatabaseManager ConfigureDatabaseManager(IDatabaseManager databaseManager,
        IConfiguration configuration,
        string connectionStringParam)
    {
        var databaseUrl = Environment.GetEnvironmentVariable(Constants.DATABASE_URL) ??
                               throw new ConfigurationErrorsException(
                                   ErrorUtil.ConfigurationParam(connectionStringParam));
        var uri = new Uri(databaseUrl);
        var userInfo = uri.UserInfo.Split(':');
        var connectionString = $"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath[1..]};Username={userInfo[0]};Password={userInfo[1]}";
        databaseManager.SetConnectionString(connectionString);
        return databaseManager;
    }
}