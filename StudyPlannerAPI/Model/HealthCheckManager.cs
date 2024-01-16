using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Default implementation for the health check service
/// </summary>
public class HealthCheckManager : IHealthCheckManager
{
    private readonly IConfiguration configuration;
    private readonly ILogger<HealthCheckManager> logger;
    private IDatabaseManager db;

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="databaseManager"></param>
    /// <param name="configuration"></param>
    /// <param name="logger"></param>
    public HealthCheckManager(IDatabaseManager databaseManager, IConfiguration configuration,
        ILogger<HealthCheckManager> logger)
    {
        db = DatabaseUtil.ConfigureDatabaseManager(databaseManager, configuration, Constants.CONNECTION_STRING);
        this.configuration = configuration;
        this.logger = logger;
    }

    /// <inheritdoc />
    public bool IsHealthy => CheckHealth();

    private bool CheckHealth()
    {
        db = DatabaseUtil.ConfigureDatabaseManager(db, configuration, Constants.CONNECTION_STRING);
        return db.ValidateConnection();
    }
}