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

using StudyPlannerAPI.Configuration;
using StudyPlannerAPI.Extensions;

namespace StudyPlannerAPI;

/// <summary>
///     Application entry point
/// </summary>
public class App
{
    /// <summary>
    ///     Duh
    /// </summary>
    /// <param name="args"></param>
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services
            .InstallServices(builder.Configuration, typeof(IServiceInstaller).Assembly);
        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors(Constants.CORS_POLICY);

        app.UseHttpsRedirection();
        app.UseAuthorization();

        app.MapControllers();

        app.UseFileServer();
        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.Run();
    }
}