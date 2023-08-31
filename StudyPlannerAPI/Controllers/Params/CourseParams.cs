namespace StudyPlannerAPI.Controllers.Params;

public class CourseParams
{
    public string Programme { get; set; }
    public string Year { get; set; }
    public List<string> MasterCodes { get; set; } = new();
}