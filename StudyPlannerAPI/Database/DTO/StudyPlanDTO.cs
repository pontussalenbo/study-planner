using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

internal class StudyPlanDTO
{
    [JsonPropertyName(Constants.STUDY_PLAN_NAME)]
    public string study_plan_name { get; set; } = string.Empty;

    [JsonPropertyName(Constants.PROGRAMME_CODE)]
    public string programme_code { get; set; } = string.Empty;

    public string year { get; set; } = string.Empty;
}