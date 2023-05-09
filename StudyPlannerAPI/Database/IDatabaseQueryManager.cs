namespace StudyPlannerAPI.Database;

public interface IDatabaseQueryManager : IDatabaseManager
{
    Task<IList<T>> ExecuteQuery<T>(string query, params object[] param);
}