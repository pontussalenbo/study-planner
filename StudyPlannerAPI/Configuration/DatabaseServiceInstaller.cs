using System.Data;
using Npgsql;
using SqlKata.Compilers;
using StudyPlannerAPI.Database;


namespace StudyPlannerAPI.Configuration;

internal class DatabaseServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IDatabaseManager, DatabaseManager>();
        services.AddScoped<IDbConnection, NpgsqlConnection>();
        services.AddScoped<Compiler, PostgresCompiler>();
    }
}