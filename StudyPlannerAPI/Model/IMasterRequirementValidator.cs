using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface IMasterRequirementValidator
{
    Task<IActionResult> ValidateCourseSelection(string programme, string year, List<string> selectedCourses,
        List<string> masterCodes, List<CustomCourseMinimalDTO> customCourses);
}