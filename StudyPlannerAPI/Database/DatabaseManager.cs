using System.Data;

namespace StudyPlannerAPI.Database
{
    public class DatabaseManager : IDatabaseManager
    {
        private readonly IDbConnection connection;

        public DatabaseManager(IDbConnection connection, IConfiguration configuration)
        {
            this.connection = connection;
            this.connection.ConnectionString = configuration[Constants.CONNECTION_STRING];
        }

        public async Task<IList<T>> GetList<T>(string query, params object[] parameters)
        {
            var data = new List<T>();
            var command = connection.CreateCommand();
            command.CommandText = query;
            for (int i = 0; i < parameters.Length; i++)
            {
                var parameter = command.CreateParameter();
                parameter.ParameterName = $"@p{i}";
                parameter.Value = parameters[i];
                command.Parameters.Add(parameter);
            }
            command.Prepare();

            try
            {
                data = await Task.Run(() =>
                {
                    connection.Open();
                    using var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        var obj = Activator.CreateInstance<T>();
                        var properties = typeof(T).GetProperties();
                        for (int i = 0; i < reader.FieldCount; i++)
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
            }
            catch (Exception)
            {
                throw;
            }

            return data;
        }
    }
}
