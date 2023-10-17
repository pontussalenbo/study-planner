using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Controllers.Params;

public class MasterCheckParams
{
    [JsonPropertyName(Constants.PROGRAMME)]
    public string Programme { get; set; }

    [JsonPropertyName(Constants.YEAR)]
    public string Year { get; set; }

    [JsonPropertyName(Constants.MASTER_CODES)]
    public List<string> MasterCodes { get; set; } = new();

    [JsonPropertyName(Constants.SELECTED_COURSES)]
    public List<string> SelectedCourses { get; set; } = new();
    public List<CustomCourseMinimalDTO> CustomCourses { get; set; } = new();
}