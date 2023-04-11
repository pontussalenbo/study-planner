using System.Data.SQLite;
using System.Diagnostics;

namespace StudyPlannerAPI.Database
{
    public class DatabaseManager : IDatabaseManager
    {
        // TODO: Take in through settings file
        public static readonly string DB_PATH = "E:\\source\\repos\\study-planner\\common\\db\\study-planner.db";

        public DatabaseManager() { }

        public IEnumerable<T> GetEnumerable<T>(string query, params object[] parameters)
        {
            List<T> data = new();
          
            using var connection = new SQLiteConnection($"Data Source={DB_PATH}");
            connection.Open();

            var command = connection.CreateCommand();
            command.CommandText = query;
            for (int i = 0; i < parameters.Length; i++)
            {
                string parameterName = $"@p{i}";
                command.Parameters.AddWithValue(parameterName, parameters[i]);
            }
            command.Prepare();

            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                var obj = Activator.CreateInstance<T>();
                var properties = typeof(T).GetProperties();

                // Make sure we have enough room
                Debug.Assert(properties.Length >= reader.FieldCount);
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    if (reader[i] == DBNull.Value)
                    {
                        continue;
                    }
                    var p = properties[i];
                    p.SetValue(obj, Convert.ChangeType(reader[i], p.PropertyType));
                }
                data.Add(obj);
            }
            
            return data;
        }
    }
}
