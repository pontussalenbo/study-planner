using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

/// <summary>
///     Data transfer object for master info
/// </summary>
public class MasterDTO
{
    /// <summary>
    ///     Master code
    /// </summary>
    [JsonPropertyName(Constants.MASTER_CODE)]
    public string master_code { get; set; } = string.Empty;

    /// <summary>
    ///     Master name in Swedish
    /// </summary>
    [JsonPropertyName(Constants.MASTER_NAME_SV)]
    public string master_name_sv { get; set; } = string.Empty;

    /// <summary>
    ///     Master name in English
    /// </summary>
    [JsonPropertyName(Constants.MASTER_NAME_EN)]
    public string master_name_en { get; set; } = string.Empty;
}