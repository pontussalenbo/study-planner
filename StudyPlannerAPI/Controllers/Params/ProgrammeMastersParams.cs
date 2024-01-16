using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Controllers.Params;

/// <summary>
///     Parameter DTO for validation
/// </summary>
public class ProgrammeMastersParams
{
    /// <summary>
    ///     Programme code
    /// </summary>
    [JsonPropertyName(Constants.PROGRAMME)]
    public string Programme { get; set; }

    /// <summary>
    ///     Year
    /// </summary>
    [JsonPropertyName(Constants.YEAR)]
    public string Year { get; set; }
}