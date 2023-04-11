namespace StudyPlannerAPI.Database
{
    public interface IDatabaseManager
    {
        IEnumerable<T> GetEnumerable<T>(string query, params object[] param); 
    }
}
