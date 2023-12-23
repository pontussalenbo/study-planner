using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

/// <summary>
///     Data transfer object for course information incl. period
/// </summary>
public class CourseDTO
{
    /// <summary>
    ///     Course code
    /// </summary>
    [JsonPropertyName(Constants.COURSE_CODE)]
    public string course_code { get; set; } = string.Empty;

    /// <summary>
    ///     Course name in Swedish
    /// </summary>
    [JsonPropertyName(Constants.COURSE_NAME_SV)]
    public string course_name_sv { get; set; } = string.Empty;

    /// <summary>
    ///     Course name in English
    /// </summary>
    [JsonPropertyName(Constants.COURSE_NAME_EN)]
    public string course_name_en { get; set; } = string.Empty;

    /// <summary>
    ///     Course credits
    /// </summary>
    public float credits { get; set; } = 0;

    /// <summary>
    ///     Course credit level
    /// </summary>
    public string level { get; set; } = string.Empty;

    /// <summary>
    ///     Set of periods the course is given
    /// </summary>
    public HashSet<PeriodDTO> periods { get; set; } = new();

    /// <summary>
    ///     Compare another course
    /// </summary>
    /// <param name="obj"></param>
    /// <returns>true if the course code is the same</returns>
    public override bool Equals(object obj)
    {
        return obj is not CourseDTO dto || course_code == dto.course_code;
    }

    /// <summary>
    ///     Simple hash code implementation
    /// </summary>
    /// <returns></returns>
    public override int GetHashCode()
    {
        return course_code.GetHashCode();
    }

    /// <summary>
    ///     Convert to object containing information. Used when course code is already known
    /// </summary>
    /// <returns></returns>
    public CourseInfoDTO ToCourseInfoDTO()
    {
        return new CourseInfoDTO(course_name_en, course_name_sv, level, credits);
    }
}