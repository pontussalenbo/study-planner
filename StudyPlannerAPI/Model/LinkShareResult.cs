using System.Text.Json.Serialization;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public class LinkShareResult
{
    [JsonPropertyName(Constants.PROGRAMME)]
    public string Programme { get; set; } = string.Empty;

    [JsonPropertyName(Constants.STUDY_PLAN_NAME)]
    public string StudyPlanName { get; set; } = string.Empty;

    [JsonPropertyName(Constants.YEAR)]
    public string Year { get; set; } = string.Empty;

    [JsonPropertyName(Constants.IS_READ_ONLY)]
    public bool IsReadOnly { get; set; } = false;

    [JsonPropertyName(Constants.SELECTED_COURSES)]
    public List<SelectedCourseDTO> SelectedCourses { get; set; } = new();
}