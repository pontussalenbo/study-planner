using System.Configuration;

namespace StudyPlannerAPI.Database.Util;

public static class DatabaseUtil
{
    public static IDatabaseManager ConfigureDatabaseManager(IDatabaseManager databaseManager,
        IConfiguration configuration,
        string connectionStringParam)
    {
        var connectionString = configuration[connectionStringParam] ??
                               throw new ConfigurationErrorsException(
                                   ConfigurationParamErrorMsg(connectionStringParam));
        databaseManager.SetConnectionString(connectionString);
        return databaseManager;
    }

    public static string ConfigurationParamErrorMsg(string configurationParam)
    {
        return $"Configuration parameter \"{configurationParam}\" is not defined!";
    }
}