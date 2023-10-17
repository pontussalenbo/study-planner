using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Controllers.Params;

public class CourseCodesParams
{
    [JsonPropertyName(Constants.COURSE_CODES)]
    public List<string> CourseCodes { get; set; } = new();
}