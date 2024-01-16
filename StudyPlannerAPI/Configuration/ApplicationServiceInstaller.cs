/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Configuration;

internal class ApplicationServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IMasterRequirementValidator, MasterRequirementValidator>();
        services.AddScoped<ICourseInfoManager, CourseInfoManager>();
        services.AddScoped<ILinkShareManager, LinkShareManager>();
        services.AddScoped<IGeneralInfoManager, GeneralInfoManager>();
        services.AddScoped<IHealthCheckManager, HealthCheckManager>();
    }
}