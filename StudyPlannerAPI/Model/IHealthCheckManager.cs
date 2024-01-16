namespace StudyPlannerAPI.Model;

/// <summary>
///     Interface for the health check service
/// </summary>
public interface IHealthCheckManager
{
    /// <summary>
    ///     Is the api healthy?
    /// </summary>
    bool IsHealthy { get; }
}