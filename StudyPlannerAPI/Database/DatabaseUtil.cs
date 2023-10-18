using System.Configuration;
using StudyPlannerAPI.Error;

namespace StudyPlannerAPI.Database;

/// <summary>
///     Utility functions for the database service
/// </summary>
public static class DatabaseUtil
{
    /// <summary>
    ///     Configure the connection string for the database service
    /// </summary>
    /// <param name="databaseManager"></param>
    /// <param name="configuration"></param>
    /// <param name="connectionStringParam"></param>
    /// <returns></returns>
    /// <exception cref="ConfigurationErrorsException"></exception>
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