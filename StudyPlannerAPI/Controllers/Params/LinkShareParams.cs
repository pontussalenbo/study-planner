namespace StudyPlannerAPI.Controllers.Params;

public class LinkShareParams
{
    public string? UniqueBlob { get; set; }
    public string? Programme { get; set; }
    public string? Year { get; set; }
    public string? StudyPlanName { get; set; }
    public List<string> MasterCodes { get; set; } = new();
    public List<string> SelectedCourses { get; set; } = new();
}