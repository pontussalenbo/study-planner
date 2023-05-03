using System.Data;

namespace StudyPlannerAPI.Database;

public class DatabaseManager : IDatabaseManager
{
    private readonly IDbConnection connection;

    public DatabaseManager(IDbConnection connection, IConfiguration configuration)
    {
        this.connection = connection;
        SetConnectionString(configuration[Constants.CONNECTION_STRING]);
    }

    public async Task<IList<T>> ExecuteQuery<T>(string query, params object[] parameters)
    {
        var data = new List<T>();
        var command = connection.CreateCommand();
        command.CommandText = query;
        for (var i = 0; i < parameters.Length; i++)
        {
            var parameter = command.CreateParameter();
            parameter.ParameterName = $"@p{i}";
            parameter.Value = parameters[i];
            command.Parameters.Add(parameter);
        }

        command.Prepare();

        data = await Task.Run(() =>
        {
            connection.Open();
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

            connection.Close();
            return data;
        });

        return data;
    }

    public T? ExecuteScalar<T>(string query, params object[] parameters)
    {
        Console.WriteLine(connection.ConnectionString);
        var command = connection.CreateCommand();
        command.CommandText = query;
        for (var i = 0; i < parameters.Length; i++)
        {
            var parameter = command.CreateParameter();
            parameter.ParameterName = $"@p{i}";
            parameter.Value = parameters[i];
            command.Parameters.Add(parameter);
        }

        command.Prepare();
        connection.Open();
        var result = command.ExecuteScalar();
        var data = (T?)Convert.ChangeType(result, typeof(T));

        connection.Close();
        return data;
    }

    public void SetConnectionString(string connectionString)
    {
        connection.ConnectionString = $"{Constants.CONNECTION_STRING_PREFIX}{connectionString}";
    }

    public bool CheckConnection(string connectionString)
    {
        if (!File.Exists(connectionString))
        {
            return false;
        }

        SetConnectionString(connectionString);
        connection.Open();
        var result = connection.State == ConnectionState.Open;
        connection.Close();
        return result;
    }
}