using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

/// <summary>
///     Data transfer object for custom courses
/// </summary>
public class CustomCourseDTO
{
    /// <summary>
    ///     Course code
    /// </summary>
    [JsonPropertyName(Constants.COURSE_CODE)]
    public string course_code { get; set; } = string.Empty;

    /// <summary>
    ///     Course name
    /// </summary>
    [JsonPropertyName(Constants.COURSE_NAME)]
    public string course_name { get; set; } = string.Empty;

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

    /// <summary>
    ///     Study year
    /// </summary>
    [JsonPropertyName(Constants.STUDY_YEAR)]
    public int study_year { get; set; } = -1;

    /// <summary>
    ///     Start period
    /// </summary>
    [JsonIgnore]
    public int period_start { get; set; } = -1;

    /// <summary>
    ///     End period
    /// </summary>
    [JsonIgnore]
    public int period_end { get; set; } = -1;

    /// <summary>
    ///     Period dto
    /// </summary>
    [JsonPropertyName(Constants.PERIOD)]
    public PeriodDTO Period => new(period_start, period_end);
}