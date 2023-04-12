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

                for (int i = 0; i < reader.FieldCount; i++)
                {
                    var colName = reader.GetName(i);
                    var property = Array.Find(properties, p => p.Name == colName);

                    if (property == null || reader[i] == DBNull.Value)
                    {
                        continue;
                    }                    
                    property.SetValue(obj, Convert.ChangeType(reader[i], property.PropertyType));
                }
                data.Add(obj);
            }
            
            return data;
        }
    }
}
