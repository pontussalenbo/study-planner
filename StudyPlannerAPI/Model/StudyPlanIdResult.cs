using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Model;

public class StudyPlanIdResult
{
    [JsonPropertyName(Constants.STUDY_PLAN_ID)]
    public string StudyPlanId { get; set; } = string.Empty;

    [JsonPropertyName(Constants.STUDY_PLAN_READ_ONLY_ID)]
    public string StudyPlanReadOnlyId { get; set; } = string.Empty;
}