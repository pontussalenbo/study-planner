namespace StudyPlannerAPI.Database.DTO;

public class LinkShareDTO
{
    public string Programme { get; set; } = string.Empty;
    public string StudyPlanName { get; set; } = string.Empty;
    public string Year { get; set; } = string.Empty;
    public List<string> MasterCodes { get; set; } = new();
    public List<string> SelectedCourses { get; set; } = new();
}