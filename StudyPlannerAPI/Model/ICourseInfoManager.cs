using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Model;

public interface ICourseInfoManager
{
    Task<IActionResult> GetCourses(string programme, string year, string master);

    Task<IActionResult> GetMasterCourses(string master, string programme, string year);
}