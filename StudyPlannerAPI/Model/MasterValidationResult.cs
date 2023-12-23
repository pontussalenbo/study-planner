using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Result DTO for master requirement validation
/// </summary>
public class MasterValidationResult
{
    /// <summary>
    ///     Master code
    /// </summary>
    [JsonPropertyName(Constants.MASTER)]
    public string Master { get; set; } = string.Empty;

    /// <summary>
    ///     Sum of G1 credits
    /// </summary>
    [JsonPropertyName(Constants.G1_CREDITS)]
    public float G1Credits { get; set; }

    /// <summary>
    ///     Sum of G2 credits
    /// </summary>
    [JsonPropertyName(Constants.G2_CREDITS)]
    public float G2Credits { get; set; }

    /// <summary>
    ///     Sum of advanced credits
    /// </summary>
    [JsonPropertyName(Constants.ADVANCED_CREDITS)]
    public float AdvancedCredits { get; set; }

    /// <summary>
    ///     Is the requirement for this master fulfilled?
    /// </summary>
    [JsonPropertyName(Constants.REQUIREMENTS_FULFILLED)]
    public bool RequirementsFulfilled { get; set; }

    /// <summary>
    ///     List of selected courses appearing in this master
    /// </summary>
    [JsonPropertyName(Constants.SELECTED_COURSES)]
    public List<string> SelectedCourses { get; set; }
}