using System.Text.Json.Serialization;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Controllers.Params;

/// <summary>
///     Parameter DTO for link sharing
/// </summary>
public class LinkShareParams
{
    /// <summary>
    ///     Unique study plan id (optional)
    /// </summary>
    [JsonPropertyName(Constants.STUDY_PLAN_ID)]
    public string StudyPlanId { get; set; }

    /// <summary>
    ///     Programme code
    /// </summary>
    [JsonPropertyName(Constants.PROGRAMME)]
    public string Programme { get; set; }

    /// <summary>
    ///     Year
    /// </summary>
    [JsonPropertyName(Constants.YEAR)]
    public string Year { get; set; }

    /// <summary>
    ///     Study plan name (optional)
    /// </summary>
    [JsonPropertyName(Constants.STUDY_PLAN_NAME)]
    public string StudyPlanName { get; set; }

    /// <summary>
    ///     List of selected courses
    /// </summary>
    [JsonPropertyName(Constants.SELECTED_COURSES)]
    public List<SelectedCourseDTO> SelectedCourses { get; set; } = new();

    // FIXME: change magic strings to constants. Depends on PR #54
    [JsonPropertyName("customCourses")]
    public List<CustomCourseDTO> CustomCourses { get; set; } = new();
}