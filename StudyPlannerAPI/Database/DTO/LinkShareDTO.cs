using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Database.DTO;

public class LinkShareDTO
{
    public string Programme { get; set; } = string.Empty;
    public string StudyPlanName { get; set; } = string.Empty;

    public string Year { get; set; } = string.Empty;

    public bool IsReadOnly { get; set; } = false;

    public List<SelectedCourseDTO> SelectedCourses { get; set; } = new();

    // FIXME: change magic strings to constants. Depends on PR #54
    [JsonPropertyName("customCourses")]
    public List<CustomCourseDTO> CustomCourses { get; set; } = new();
}