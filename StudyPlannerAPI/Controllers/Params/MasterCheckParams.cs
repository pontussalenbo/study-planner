using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Controllers.Params;

public class MasterCheckParams
{
    public string Programme { get; set; }
    public string Year { get; set; }
    public List<string> MasterCodes { get; set; } = new();
    public List<string> SelectedCourses { get; set; } = new();
    public List<CustomCourseMinimalDTO> CustomCourses { get; set; } = new();
}