using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface ILinkShareManager
{
    Task<IActionResult> GetUniqueBlobFromPlan(string programme, string year, List<string> masters,
        List<SelectedCourseDTO> selectedCourses, string studyPlanName);

    Task<IActionResult> GetPlanFromUniqueBlob(string uniqueBlob);
}