using StudyPlannerAPI.Model;

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