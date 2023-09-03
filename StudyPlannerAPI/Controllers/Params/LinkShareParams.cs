using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Controllers.Params;

public class LinkShareParams
{
    public string Programme { get; set; }
    public string Year { get; set; }
    public string StudyPlanName { get; set; }
    public List<SelectedCourseDTO> SelectedCourses { get; set; } = new();
}