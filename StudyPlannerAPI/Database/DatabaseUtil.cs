using System.Configuration;
using StudyPlannerAPI.Error;

namespace StudyPlannerAPI.Database;

public static class DatabaseUtil
{
    public static IDatabaseManager ConfigureDatabaseManager(IDatabaseManager databaseManager,
        IConfiguration configuration,
        string connectionStringParam)
    {
        var connectionString = configuration[connectionStringParam] ??
                               throw new ConfigurationErrorsException(
                                   ErrorUtil.ConfigurationParam(connectionStringParam));
        databaseManager.SetConnectionString(connectionString);
        return databaseManager;
    }
}