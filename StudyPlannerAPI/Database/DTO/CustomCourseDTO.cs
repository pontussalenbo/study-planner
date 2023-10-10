using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class CustomCourseDTO
{
    // FIXME: change magic strings to constants. Depends on PR #54

    [JsonPropertyName("courseCode")]
    public string course_code { get; set; } = string.Empty;

    [JsonPropertyName("courseName")]
    public string course_name { get; set; } = string.Empty;

    [JsonPropertyName("level")]
    public string level { get; set; } = string.Empty;

    [JsonPropertyName("credits")]
    public float credits { get; set; } = -1;

    [JsonPropertyName("studyYear")]
    public int study_year { get; set; } = -1;

    [JsonPropertyName("periodStart")]
    public int period_start { get; set; } = -1;

    [JsonPropertyName("periodEnd")]
    public int period_end { get; set; } = -1;
}