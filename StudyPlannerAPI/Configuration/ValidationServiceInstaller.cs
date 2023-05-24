using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Controllers.Validation;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Configuration;

public class ValidationServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IValidator<CourseParams>, CourseParamsValidator>();
        services.AddScoped<IValidator<MasterCheckParams>, MasterCheckParamsValidator>();
        services.AddScoped<IValidator<LinkShareParams>, LinkShareParamsValidator>();
        services.AddScoped<IValidator<UniqueBlobDTO>, UniqueBlobValidator>();
        services.AddScoped<IValidator<ProgrammeMastersParams>, ProgrammeMastersParamsValidator>();
    }
}