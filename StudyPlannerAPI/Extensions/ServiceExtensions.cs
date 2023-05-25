using System.Reflection;
using StudyPlannerAPI.Configuration;

namespace StudyPlannerAPI.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection InstallServices(this IServiceCollection services, IConfiguration configuration,
        params Assembly[] assemblies)
    {
        var serviceInstallers =
            assemblies
                .SelectMany(a => a.DefinedTypes)
                .Where(IsAssignableType<IServiceInstaller>)
                .Select(Activator.CreateInstance)
                .Cast<IServiceInstaller>();

        foreach (var installer in serviceInstallers)
        {
            installer.Install(services, configuration);
        }

        return services;
    }

    private static bool IsAssignableType<T>(Type typeInfo)
    {
        return typeof(T).IsAssignableFrom(typeInfo) && !typeInfo.IsInterface && !typeInfo.IsAbstract;
    }
}