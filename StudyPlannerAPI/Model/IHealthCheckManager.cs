﻿namespace StudyPlannerAPI.Model;

public interface IHealthCheckManager
{
    bool IsHealthy { get; }
    bool CheckDatabaseConnection(string connectionString);
}