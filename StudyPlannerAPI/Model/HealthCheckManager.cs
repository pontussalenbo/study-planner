using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Model;

public class HealthCheckManager : IHealthCheckManager
{
    private readonly IConfiguration configuration;
    private readonly ILogger<HealthCheckManager> logger;
    private IDatabaseManager db;

    public HealthCheckManager(IDatabaseManager databaseManager, IConfiguration configuration,
        ILogger<HealthCheckManager> logger)
    {
        db = DatabaseUtil.ConfigureDatabaseManager(databaseManager, configuration, Constants.CONNECTION_STRING);
        this.configuration = configuration;
        this.logger = logger;
    }

    public bool IsHealthy => CheckHealth();

    private bool CheckHealth()
    {
        db = DatabaseUtil.ConfigureDatabaseManager(db, configuration, Constants.CONNECTION_STRING);
        return db.ValidateConnection();
    }
}