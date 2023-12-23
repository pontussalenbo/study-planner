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

using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Controllers.Validation;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Configuration;

internal class ValidationServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IValidator<CourseParams>, CourseParamsValidator>();
        services.AddScoped<IValidator<MasterCheckParams>, MasterCheckParamsValidator>();
        services.AddScoped<IValidator<LinkShareParams>, LinkShareParamsValidator>();
        services.AddScoped<IValidator<StudyPlanIdResult>, StudyPlanIdValidator>();
        services.AddScoped<IValidator<ProgrammeMastersParams>, ProgrammeMastersParamsValidator>();
        services.AddScoped<IValidator<CustomCourseDTO>, CustomCourseValidator>();
        services.AddScoped<IValidator<CustomCourseMinimalDTO>, CustomCourseMinimalValidator>();
        services.AddScoped<IValidator<SelectedCourseDTO>, SelectedCourseValidator>();
    }
}