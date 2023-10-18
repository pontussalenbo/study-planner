using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Interface for the course info service
/// </summary>
public interface ICourseInfoManager
{
    /// <summary>
    ///     Get courses for a programme during a given year
    /// </summary>
    /// <param name="programme"></param>
    /// <param name="year"></param>
    /// <param name="master"></param>
    /// <returns></returns>
    Task<IActionResult> GetCoursesByProgrammeAndYear(string programme, string year, List<string> master);

    /// <summary>
    ///     Get courses given their course codes
    /// </summary>
    /// <param name="courseCodes"></param>
    /// <returns></returns>
    Task<IActionResult> GetCourses(List<string> courseCodes);
}