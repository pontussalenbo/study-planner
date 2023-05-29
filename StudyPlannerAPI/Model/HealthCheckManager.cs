using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Model;

public class HealthCheckManager : IHealthCheckManager
{
    private readonly IConfiguration configuration;
    private readonly ILogger<HealthCheckManager> logger;
    private IDatabaseQueryManager databaseQueryManager;

    public HealthCheckManager(IDatabaseQueryManager databaseQueryManager, IConfiguration configuration,
        ILogger<HealthCheckManager> logger)
    {
        this.databaseQueryManager =
            (IDatabaseQueryManager)DatabaseUtil.ConfigureDatabaseManager(databaseQueryManager, configuration,
                Constants.CONNECTION_STRING);
        this.configuration = configuration;
        this.logger = logger;
    }

    public bool IsHealthy => CheckHealth();

    private bool CheckHealth()
    {
        databaseQueryManager =
            (IDatabaseQueryManager)DatabaseUtil.ConfigureDatabaseManager(databaseQueryManager, configuration,
                Constants.CONNECTION_STRING);
        var connectionResult = databaseQueryManager.ValidateConnection();

        databaseQueryManager = (IDatabaseQueryManager)DatabaseUtil.ConfigureDatabaseManager(databaseQueryManager,
            configuration,
            Constants.CONNECTION_STRING_LINKS);
        connectionResult = connectionResult && databaseQueryManager.ValidateConnection();

        return connectionResult;
    }
}