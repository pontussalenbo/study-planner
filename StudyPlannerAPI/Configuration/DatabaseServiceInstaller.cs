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

using System.Data;
using System.Data.SQLite;
using SqlKata.Compilers;
using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Configuration;

internal class DatabaseServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IDatabaseManager, DatabaseManager>();
        services.AddScoped<IDbConnection, SQLiteConnection>();
        services.AddScoped<Compiler, SqliteCompiler>();
    }
}