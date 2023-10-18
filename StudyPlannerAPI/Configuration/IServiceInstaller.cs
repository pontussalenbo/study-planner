namespace StudyPlannerAPI.Configuration;

internal interface IServiceInstaller
{
    void Install(IServiceCollection services, IConfiguration configuration);
}