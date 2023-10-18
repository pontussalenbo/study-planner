using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Interface for the general information service
/// </summary>
public interface IGeneralInfoManager
{
    /// <summary>
    ///     Get all master programmes at LTH
    /// </summary>
    /// <returns></returns>
    public Task<IActionResult> GetProgrammes();

    /// <summary>
    ///     Get all academic years until now
    /// </summary>
    /// <returns></returns>
    public Task<IActionResult> GetAcademicYears();

    /// <summary>
    ///     Get all class years that LTH have posted masters for
    /// </summary>
    /// <returns></returns>
    public Task<IActionResult> GetClassYears();

    /// <summary>
    ///     Get masters in a programme during a given year
    /// </summary>
    /// <param name="programme"></param>
    /// <param name="year"></param>
    /// <returns></returns>
    public Task<IActionResult> GetMasters(string programme, string year);
}