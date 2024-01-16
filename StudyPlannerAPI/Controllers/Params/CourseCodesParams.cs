using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Controllers.Params;

/// <summary>
///     Parameter DTO for a list of course codes
/// </summary>
public class CourseCodesParams
{
    /// <summary>
    ///     List of course codes
    /// </summary>
    [JsonPropertyName(Constants.COURSE_CODES)]
    public List<string> CourseCodes { get; set; } = new();
}