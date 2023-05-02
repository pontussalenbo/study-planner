using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Model;

public interface IGeneralInfoManager
{
    public Task<IActionResult> GetProgrammes();
    public Task<IActionResult> GetAcademicYears();
    public Task<IActionResult> GetClassYears();
}