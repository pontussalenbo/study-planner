using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Database.DTO;

/// <summary>
///     Data transfer object for course information
/// </summary>
public class CourseInfoDTO
{
    /// <summary>
    ///     Constructor
    /// </summary>
    /// <param name="courseNameEn"></param>
    /// <param name="courseNameSv"></param>
    /// <param name="level"></param>
    /// <param name="credits"></param>
    public CourseInfoDTO(string courseNameEn, string courseNameSv, string level, float credits)
    {
        CourseNameEn = courseNameEn;
        CourseNameSv = courseNameSv;
        Level = level;
        Credits = credits;
    }

    /// <summary>
    ///     Course name in English
    /// </summary>
    [JsonPropertyName(Constants.COURSE_NAME_EN)]
    public string CourseNameEn { get; private set; }

    /// <summary>
    ///     Course name in Swedish
    /// </summary>
    [JsonPropertyName(Constants.COURSE_NAME_SV)]
    public string CourseNameSv { get; private set; }

    /// <summary>
    ///     Course credit level
    /// </summary>
    [JsonPropertyName(Constants.LEVEL)]
    public string Level { get; private set; }

    /// <summary>
    ///     Course credit
    /// </summary>
    [JsonPropertyName(Constants.CREDITS)]
    public float Credits { get; private set; }
}