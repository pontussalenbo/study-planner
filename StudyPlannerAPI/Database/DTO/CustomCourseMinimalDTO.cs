using System.Text.Json.Serialization;

#pragma warning disable IDE1006

namespace StudyPlannerAPI.Database.DTO;

/// <summary>
///     Data transfer object for custom courses with minimal info for master check
/// </summary>
public class CustomCourseMinimalDTO
{
    /// <summary>
    ///     Course code
    /// </summary>
    [JsonPropertyName(Constants.COURSE_CODE)]
    public string course_code { get; set; } = string.Empty;

    /// <summary>
    ///     Level
    /// </summary>
    [JsonPropertyName(Constants.LEVEL)]
    public string level { get; set; } = string.Empty;

    /// <summary>
    ///     Credits
    /// </summary>
    [JsonPropertyName(Constants.CREDITS)]
    public float credits { get; set; } = -1;
}