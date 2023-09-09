using System.Data;

namespace StudyPlannerAPI.Database;

public class DatabaseQueryManager : IDatabaseQueryManager
{
    private readonly ILogger<DatabaseQueryManager> logger;

    public DatabaseQueryManager(IDbConnection connection, ILogger<DatabaseQueryManager> logger)
    {
        Connection = connection;
        this.logger = logger;
    }

    public IDbConnection Connection { get; }

    public async Task<IList<T>> ExecuteQuery<T>(string query, params object[] param)
    {
        var data = new List<T>();
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

        data = await Task.Run(() =>
        {
            Connection.Open();
            //Connection.BeginTransaction(IsolationLevel.ReadCommitted);
            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                var obj = Activator.CreateInstance<T>();
                var properties = typeof(T).GetProperties();
                for (var i = 0; i < reader.FieldCount; i++)
                {
                    var colName = reader.GetName(i);
                    var property = Array.Find(properties, p => p.Name == colName);
                    if (property != null && reader[i] != DBNull.Value)
                    {
                        property.SetValue(obj, Convert.ChangeType(reader[i], property.PropertyType));
                    }
                }

                data.Add(obj);
            }

            Connection.Close();
            return data;
        });

        return data;
    }
}