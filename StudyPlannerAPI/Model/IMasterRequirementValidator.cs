using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Model;

public interface IMasterRequirementValidator
{
    Task<IActionResult> ValidateCourseSelection(string programme, string year, List<string> selectedCourses,
        List<string> masterCodes);
}