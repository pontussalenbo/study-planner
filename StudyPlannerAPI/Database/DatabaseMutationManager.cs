using System.Data;

namespace StudyPlannerAPI.Database;

public class DatabaseMutationManager : IDatabaseMutationManager
{
    private readonly ILogger<DatabaseMutationManager> logger;

    public DatabaseMutationManager(IDbConnection connection, ILogger<DatabaseMutationManager> logger)
    {
        Connection = connection;
        this.logger = logger;
    }

    public IDbConnection Connection { get; }

    public T ExecuteScalar<T>(string query, params object[] param)
    {
        var command = Connection.CreateCommand();
        command.CommandText = query;
        for (var i = 0; i < param.Length; i++)
        {
            var parameter = command.CreateParameter();
            parameter.ParameterName = $"@p{i}";
            parameter.Value = param[i];
            command.Parameters.Add(parameter);
        }

        command.Prepare();
        Connection.Open();
        var result = command.ExecuteScalar();
        var data = (T)Convert.ChangeType(result, typeof(T));

        Connection.Close();
        return data;
    }

    public T ExecuteScalar<T>(string query, string connectionString, params object[] param)
    {
        Connection.ConnectionString = "Data Source=.\\Database\\study-plan-link.db";
        var command = Connection.CreateCommand();
        command.CommandText = query;
        for (var i = 0; i < param.Length; i++)
        {
            var parameter = command.CreateParameter();
            parameter.ParameterName = $"@p{i}";
            parameter.Value = param[i];
            command.Parameters.Add(parameter);
        }

        command.Prepare();
        Connection.Open();
        var result = command.ExecuteScalar();
        var data = (T)Convert.ChangeType(result, typeof(T));

        Connection.Close();
        return data;
    }
}