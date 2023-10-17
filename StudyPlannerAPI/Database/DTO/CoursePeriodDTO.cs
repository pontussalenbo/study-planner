using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class CoursePeriodDTO
{
    [JsonPropertyName(Constants.COURSE_CODE)]
    public string course_code { get; set; } = string.Empty;

    [JsonPropertyName(Constants.PERIOD_START)]
    public int period_start { get; set; } = -1;

    [JsonPropertyName(Constants.PERIOD_END)]
    public int period_end { get; set; } = -1;
}