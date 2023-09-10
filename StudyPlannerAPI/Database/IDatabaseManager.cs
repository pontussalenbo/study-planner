using System.Data;
using SqlKata;

namespace StudyPlannerAPI.Database;

public interface IDatabaseManager
{
    IDbConnection Connection { get; }

    Task<List<T>> ExecuteQuery<T>(Query query);
    Task<int> ExecuteInsert(string table, IEnumerable<KeyValuePair<string, object>> data);

    void SetConnectionString(string connectionString)
    {
        Connection.ConnectionString = $"{Constants.CONNECTION_STRING_PREFIX}{connectionString}";
    }

    bool ValidateConnection()
    {
        Connection.Open();
        var result = Connection.State == ConnectionState.Open;
        Connection.Close();
        return result && Connection.State == ConnectionState.Closed;
    }
}