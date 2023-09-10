using System.Data;
using SqlKata;
using SqlKata.Compilers;
using SqlKata.Execution;

namespace StudyPlannerAPI.Database;

public class DatabaseManager : IDatabaseManager
{
    private readonly ILogger<DatabaseManager> logger;
    private readonly QueryFactory db;
    public IDbConnection Connection { get; }

    public DatabaseManager(IDbConnection connection, ILogger<DatabaseManager> logger, Compiler sqlCompiler)
    {
        Connection = connection;
        this.logger = logger;
        db = new QueryFactory(Connection, sqlCompiler);
    }

    public async Task<List<T>> ExecuteQuery<T>(Query query)
    {
        return (await db.FromQuery(query).GetAsync<T>()).ToList();
    }

    public async Task<int> ExecuteInsert(string table, IEnumerable<KeyValuePair<string, object>> data)
    {
        return await db.Query(table).InsertGetIdAsync<int>(data);
    }
}