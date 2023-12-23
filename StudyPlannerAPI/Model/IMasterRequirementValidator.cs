using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Interface for the master requirement validation service
/// </summary>
public interface IMasterRequirementValidator
{
    /// <summary>
    ///     Validate master requirements for a given study plan
    /// </summary>
    /// <param name="programme"></param>
    /// <param name="year"></param>
    /// <param name="selectedCourses"></param>
    /// <param name="masterCodes"></param>
    /// <param name="customCourses"></param>
    /// <returns></returns>
    Task<IActionResult> ValidateCourseSelection(string programme, string year, List<string> selectedCourses,
        List<string> masterCodes, List<CustomCourseMinimalDTO> customCourses);
}