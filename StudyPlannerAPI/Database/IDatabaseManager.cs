namespace StudyPlannerAPI.Database
{
    public interface IDatabaseManager
    {
        Task<IList<T>> GetList<T>(string query, params object[] param); 
    }
}
