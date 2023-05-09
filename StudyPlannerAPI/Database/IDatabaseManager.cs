using System.Data;

namespace StudyPlannerAPI.Database;

public interface IDatabaseManager
{
    IDbConnection Connection { get; }

    void SetConnectionString(string connectionString)
    {
        Connection.ConnectionString = $"{Constants.CONNECTION_STRING_PREFIX}{connectionString}";
    }

    bool ValidateConnection()
    {
        if (!File.Exists(Connection.ConnectionString))
        {
            return false;
        }

        Connection.Open();
        var result = Connection.State == ConnectionState.Open;
        Connection.Close();
        return result;
    }
}