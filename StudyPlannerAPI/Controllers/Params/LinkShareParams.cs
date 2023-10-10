using System.Text.Json.Serialization;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Controllers.Params;

public class LinkShareParams
{
    public string UniqueBlob { get; set; }
    public string Programme { get; set; }
    public string Year { get; set; }
    public string StudyPlanName { get; set; }
    public List<SelectedCourseDTO> SelectedCourses { get; set; } = new();

    // FIXME: change magic strings to constants. Depends on PR #54
    [JsonPropertyName("customCourses")]
    public List<CustomCourseDTO> CustomCourses { get; set; } = new();
}