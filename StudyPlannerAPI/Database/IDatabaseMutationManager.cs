namespace StudyPlannerAPI.Database;

public interface IDatabaseMutationManager : IDatabaseManager
{
    T ExecuteScalar<T>(string query, params object[] param);
    T ExecuteScalar<T>(string query, string connectionString, params object[] param);
}