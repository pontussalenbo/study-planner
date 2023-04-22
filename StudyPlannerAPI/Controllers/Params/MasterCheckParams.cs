namespace StudyPlannerAPI.Controllers.Params;

public class MasterCheckParams
{
    public string? Programme { get; set; }
    public string? ClassYear { get; set; }
    public string? AcademicYear { get; set; }
    public List<string> MasterCodes { get; set; } = new();
    public List<string> SelectedCourses { get; set; } = new();
}