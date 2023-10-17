using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Controllers.Validation;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Configuration;

public class ValidationServiceInstaller : IServiceInstaller
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