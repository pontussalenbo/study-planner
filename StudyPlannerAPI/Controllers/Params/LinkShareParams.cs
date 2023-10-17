using System.Text.Json.Serialization;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Controllers.Params;

public class LinkShareParams
{
    [JsonPropertyName(Constants.STUDY_PLAN_ID)]
    public string StudyPlanId { get; set; }

    [JsonPropertyName(Constants.PROGRAMME)]
    public string Programme { get; set; }

    [JsonPropertyName(Constants.YEAR)]
    public string Year { get; set; }

    [JsonPropertyName(Constants.STUDY_PLAN_NAME)]
    public string StudyPlanName { get; set; }

    [JsonPropertyName(Constants.SELECTED_COURSES)]
    public List<SelectedCourseDTO> SelectedCourses { get; set; } = new();

    // FIXME: change magic strings to constants. Depends on PR #54
    [JsonPropertyName("customCourses")]
    public List<CustomCourseDTO> CustomCourses { get; set; } = new();
}