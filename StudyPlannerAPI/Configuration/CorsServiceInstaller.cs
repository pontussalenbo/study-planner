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