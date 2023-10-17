using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Model;

public class MasterValidationResult
{
    [JsonPropertyName(Constants.MASTER)]
    public string Master { get; set; } = string.Empty;

    [JsonPropertyName(Constants.G1_CREDITS)]
    public float G1Credits { get; set; }

    [JsonPropertyName(Constants.G2_CREDITS)]
    public float G2Credits { get; set; }

    [JsonPropertyName(Constants.ADVANCED_CREDITS)]
    public float AdvancedCredits { get; set; }

    [JsonPropertyName(Constants.REQUIREMENTS_FULFILLED)]
    public bool RequirementsFulfilled { get; set; }

    [JsonPropertyName(Constants.SELECTED_COURSES)]
    public List<string> SelectedCourses { get; set; }
}