using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Model;

public interface ILinkShareManager
{
    Task<IActionResult> GetUniqueBlobFromPlan(string programme, string year, List<string> masters,
        List<string> selectedCourses,
        string studyPlanName);

    Task<IActionResult> GetPlanFromUniqueBlob(string uniqueBlob);
}