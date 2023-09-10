using System.Data;
using System.Data.SQLite;
using SqlKata.Compilers;
using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Configuration;

public class DatabaseServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IDatabaseManager, DatabaseManager>();
        services.AddScoped<IDbConnection, SQLiteConnection>();
        services.AddScoped<Compiler, SqliteCompiler>();
    }
}