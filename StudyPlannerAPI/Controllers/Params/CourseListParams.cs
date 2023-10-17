using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Controllers.Params;

/// <summary>
///     Parameter DTO for getting course information from a list of course codes
/// </summary>
public class CourseListParams
{
    /// <summary>
    ///     List of course codes
    /// </summary>
    [JsonPropertyName("courseCodes")]
    public List<string> CourseCodes { get; set; } = new();
}