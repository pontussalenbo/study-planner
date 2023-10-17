using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class MasterDTO
{
    [JsonPropertyName(Constants.MASTER_CODE)]
    public string master_code { get; set; } = string.Empty;

    [JsonPropertyName(Constants.MASTER_NAME_SV)]
    public string master_name_sv { get; set; } = string.Empty;

    [JsonPropertyName(Constants.MASTER_NAME_EN)]
    public string master_name_en { get; set; } = string.Empty;
}