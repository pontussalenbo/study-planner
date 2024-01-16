using System.Data;
using SqlKata;

namespace StudyPlannerAPI.Database;

/// <summary>
///     Interface for the database service
/// </summary>
public interface IDatabaseManager
{
    /// <summary>
    ///     Database connection
    /// </summary>
    IDbConnection Connection { get; }

    /// <summary>
    ///     Execute an SqlKata.Query
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="query"></param>
    /// <returns></returns>
    Task<List<T>> ExecuteQuery<T>(Query query);

    /// <summary>
    ///     Execute an insert statement
    /// </summary>
    /// <param name="table"></param>
    /// <param name="data"></param>
    /// <returns>Number of affected rows</returns>
    Task<int> ExecuteInsert(string table, IEnumerable<KeyValuePair<string, object>> data);

    /// <summary>
    ///     Set the connection string for the database connection
    /// </summary>
    /// <param name="connectionString"></param>
    void SetConnectionString(string connectionString)
    {
        Connection.ConnectionString = connectionString;
    }

    /// <summary>
    ///     Validate connection by trying to open and close
    /// </summary>
    /// <returns>true if successful</returns>
    bool ValidateConnection()
    {
        Connection.Open();
        var result = Connection.State == ConnectionState.Open;
        Connection.Close();
        return result && Connection.State == ConnectionState.Closed;
    }
}