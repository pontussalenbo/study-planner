using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface ILinkShareManager
{
    Task<IActionResult> GetUniqueBlobFromPlan(string programme, string year,
        List<SelectedCourseDTO> selectedCourses, string studyPlanName, string uniqueBlob);

    Task<IActionResult> GetPlanFromUniqueBlob(string uniqueBlob);

    Task<IActionResult> DeleteStudyPlanWithId(string studyPlanId);
}