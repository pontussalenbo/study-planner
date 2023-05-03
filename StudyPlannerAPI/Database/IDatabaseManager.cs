namespace StudyPlannerAPI.Database;

public interface IDatabaseManager
{
    Task<IList<T>> ExecuteQuery<T>(string query, params object[] param);

    T? ExecuteScalar<T>(string query, params object[] param);

    void SetConnectionString(string connectionString);
    bool CheckConnection(string connectionString);
}