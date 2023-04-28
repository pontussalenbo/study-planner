namespace StudyPlannerAPI.Database;

public interface IDatabaseManager
{
    Task<IList<T>> ExecuteQuery<T>(string query, params object[] param);

    T? ExecuteScalar<T>(string query, params object[] param);
}