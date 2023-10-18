namespace StudyPlannerAPI.Configuration;

internal class ControllerServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers()
            .AddJsonOptions(options => { options.JsonSerializerOptions.PropertyNamingPolicy = null; });
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddCors();
    }
}