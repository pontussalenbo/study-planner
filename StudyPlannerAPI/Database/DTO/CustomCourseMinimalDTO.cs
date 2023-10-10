using System.Text.Json.Serialization;

#pragma warning disable IDE1006

namespace StudyPlannerAPI.Database.DTO;

public class CustomCourseMinimalDTO
{
    [JsonPropertyName("courseCode")]
    public string course_code { get; set; } = string.Empty;

    [JsonPropertyName("level")]
    public string level { get; set; } = string.Empty;

    [JsonPropertyName("credits")]
    public float credits { get; set; } = -1;
}