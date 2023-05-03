using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Model;

public class HealthCheckManager : IHealthCheckManager
{
    private readonly IConfiguration configuration;
    private readonly IDatabaseManager databaseManager;

    public HealthCheckManager(IDatabaseManager databaseManager, IConfiguration configuration)
    {
        this.databaseManager = databaseManager;
        this.configuration = configuration;
    }

    public bool IsHealthy =>
        CheckDatabaseConnection(configuration[Constants.CONNECTION_STRING]) &&
        CheckDatabaseConnection(configuration[Constants.CONNECTION_STRING_LINKS]);

    public bool CheckDatabaseConnection(string connectionString)
    {
        return databaseManager.CheckConnection(connectionString);
    }
}