using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Interface for the link sharing service
/// </summary>
public interface ILinkShareManager
{
    /// <summary>
    ///     Create a study plan associated with a unique id and read-only id
    /// </summary>
    /// <param name="programme"></param>
    /// <param name="year"></param>
    /// <param name="selectedCourses"></param>
    /// <param name="studyPlanName"></param>
    /// <param name="studyPlanId"></param>
    /// <returns></returns>
    Task<IActionResult> GetIdFromStudyPlan(string programme, string year,
        List<SelectedCourseDTO> selectedCourses, string studyPlanName, string studyPlanId);

    /// <summary>
    ///     Gets a study plan given an id
    /// </summary>
    /// <param name="studyPlanId"></param>
    /// <returns></returns>
    Task<IActionResult> GetStudyPlanFromId(string studyPlanId);
}