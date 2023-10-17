using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class CourseDTO
{
    [JsonPropertyName(Constants.COURSE_CODE)]
    public string course_code { get; set; } = string.Empty;

    [JsonPropertyName(Constants.COURSE_NAME_SV)]
    public string course_name_sv { get; set; } = string.Empty;

    [JsonPropertyName(Constants.COURSE_NAME_EN)]
    public string course_name_en { get; set; } = string.Empty;

    public float credits { get; set; } = 0;
    public string level { get; set; } = string.Empty;

    public HashSet<PeriodDTO> periods { get; set; } = new();

    public override bool Equals(object obj)
    {
        return obj is not CourseDTO dto || course_code == dto.course_code;
    }

    public override int GetHashCode()
    {
        return course_code.GetHashCode();
    }

    public CourseInfoDTO ToCourseInfoDTO()
    {
        return new CourseInfoDTO(course_name_en, course_name_sv, level, credits);
    }
}