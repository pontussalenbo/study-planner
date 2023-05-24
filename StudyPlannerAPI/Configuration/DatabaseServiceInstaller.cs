using System.Data;
using System.Data.SQLite;
using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Configuration;

public class DatabaseServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IDatabaseQueryManager, DatabaseQueryManager>();
        services.AddScoped<IDatabaseMutationManager, DatabaseMutationManager>();
        services.AddScoped<IDbConnection, SQLiteConnection>();
    }
}