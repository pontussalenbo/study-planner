using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Database.DTO;

public class CourseInfoDTO
{
    public CourseInfoDTO(string courseNameEn, string courseNameSv, string level, float credits)
    {
        CourseNameEn = courseNameEn;
        CourseNameSv = courseNameSv;
        Level = level;
        Credits = credits;
    }

    [JsonPropertyName("courseName_en")]
    public string CourseNameEn { get; private set; }

    [JsonPropertyName("courseName_sv")]
    public string CourseNameSv { get; private set; }

    [JsonPropertyName("level")]
    public string Level { get; private set; }

    [JsonPropertyName("credits")]
    public float Credits { get; private set; }
}