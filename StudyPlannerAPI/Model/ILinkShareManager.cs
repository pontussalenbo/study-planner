using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface ILinkShareManager
{
    Task<IActionResult> GetIdFromStudyPlan(string programme, string year,
        List<SelectedCourseDTO> selectedCourses, string studyPlanName, string studyPlanId);

    Task<IActionResult> GetStudyPlanFromId(string studyPlanId);
}