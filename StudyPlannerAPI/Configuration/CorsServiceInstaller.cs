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

using System.Configuration;
using StudyPlannerAPI.Error;

namespace StudyPlannerAPI.Configuration;

internal class CorsServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(Constants.CORS_POLICY, policy =>
            {
                var origins = configuration.GetSection(Constants.ORIGINS).Get<List<string>>() ??
                              throw new ConfigurationErrorsException(ErrorUtil.ConfigurationParam(Constants.ORIGINS));
                policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins(origins.ToArray());
            });
        });
    }
}