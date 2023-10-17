using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class SelectedCourseDTO
{
    [JsonPropertyName(Constants.COURSE_CODE)]
    public string course_code { get; set; } = string.Empty;

    [JsonPropertyName(Constants.STUDY_YEAR)]
    public int study_year { get; set; } = -1;

    [JsonPropertyName(Constants.PERIOD_START)]
    public int period_start { get; set; } = 0;

    [JsonPropertyName(Constants.PERIOD_END)]
    public int period_end { get; set; } = 0;
}