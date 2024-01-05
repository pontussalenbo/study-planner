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
        var databaseUrl = Environment.GetEnvironmentVariable(Constants.DATABASE_URL) ??
                               throw new ConfigurationErrorsException(
                                   ErrorUtil.ConfigurationParam(connectionStringParam));
        var uri = new Uri(databaseUrl);
        var userInfo = uri.UserInfo.Split(':');
        var connectionString = $"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath[1..]};Username={userInfo[0]};Password={userInfo[1]}";
        databaseManager.SetConnectionString(connectionString);
        return databaseManager;
    }
}