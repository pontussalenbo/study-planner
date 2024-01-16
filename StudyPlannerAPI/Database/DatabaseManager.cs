using System.Data;
using SqlKata;
using SqlKata.Compilers;
using SqlKata.Execution;

namespace StudyPlannerAPI.Database;

/// <summary>
///     Default implementation of the database service
/// </summary>
public class DatabaseManager : IDatabaseManager
{
    private readonly ILogger<DatabaseManager> logger;
    private readonly QueryFactory db;

    /// <inheritdoc />
    public IDbConnection Connection { get; }

    /// <summary>
    ///     Constructor. DI will handle this
    /// </summary>
    /// <param name="connection"></param>
    /// <param name="logger"></param>
    /// <param name="sqlCompiler"></param>
    public DatabaseManager(IDbConnection connection, ILogger<DatabaseManager> logger, Compiler sqlCompiler)
    {
        Connection = connection;
        this.logger = logger;
        db = new QueryFactory(Connection, sqlCompiler);
    }

    /// <inheritdoc />
    public async Task<List<T>> ExecuteQuery<T>(Query query)
    {
        return (await db.FromQuery(query).GetAsync<T>()).ToList();
    }

    /// <inheritdoc />
    public async Task<int> ExecuteInsert(string table, IEnumerable<KeyValuePair<string, object>> data)
    {
        return await db.Query(table).InsertGetIdAsync<int>(data);
    }
}