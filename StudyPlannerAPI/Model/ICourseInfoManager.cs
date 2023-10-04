using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Model;

public interface ICourseInfoManager
{
    Task<IActionResult> GetCoursesByProgrammeAndYear(string programme, string year, List<string> master);

    Task<IActionResult> GetCourses(List<string> courseCodes);
}