/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿using System.Data;
using SqlKata;

namespace StudyPlannerAPI.Database;

/// <summary>
///     Interface for the database service
/// </summary>
public interface IDatabaseManager
{
    /// <summary>
    ///     Database connection
    /// </summary>
    IDbConnection Connection { get; }

    /// <summary>
    ///     Execute an SqlKata.Query
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="query"></param>
    /// <returns></returns>
    Task<List<T>> ExecuteQuery<T>(Query query);

    /// <summary>
    ///     Execute an insert statement
    /// </summary>
    /// <param name="table"></param>
    /// <param name="data"></param>
    /// <returns>Number of affected rows</returns>
    Task<int> ExecuteInsert(string table, IEnumerable<KeyValuePair<string, object>> data);

    /// <summary>
    ///     Set the connection string for the database connection
    /// </summary>
    /// <param name="connectionString"></param>
    void SetConnectionString(string connectionString)
    {
        Connection.ConnectionString = connectionString;
    }

    /// <summary>
    ///     Validate connection by trying to open and close
    /// </summary>
    /// <returns>true if successful</returns>
    bool ValidateConnection()
    {
        Connection.Open();
        var result = Connection.State == ConnectionState.Open;
        Connection.Close();
        return result && Connection.State == ConnectionState.Closed;
    }
}