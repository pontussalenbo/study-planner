namespace StudyPlannerAPI.Database;

public interface IDatabaseMutationManager : IDatabaseManager
{
    T ExecuteScalar<T>(string query, params object[] param);

    void ExecuteScalar(string query, params object[] param);
}