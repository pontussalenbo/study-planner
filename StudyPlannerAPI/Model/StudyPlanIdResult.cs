using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Class for study plan creation result
/// </summary>
public class StudyPlanIdResult
{
    /// <summary>
    ///     Unique study plan id
    /// </summary>
    [JsonPropertyName(Constants.STUDY_PLAN_ID)]
    public string StudyPlanId { get; set; } = string.Empty;

    /// <summary>
    ///     Unique study plan read only id
    /// </summary>
    [JsonPropertyName(Constants.STUDY_PLAN_READ_ONLY_ID)]
    public string StudyPlanReadOnlyId { get; set; } = string.Empty;
}