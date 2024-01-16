using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Controllers.Params;

/// <summary>
///     Parameter DTO for course information
/// </summary>
public class CourseParams
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

    /// <summary>
    ///     List of master codes
    /// </summary>
    [JsonPropertyName(Constants.MASTER_CODES)]
    public List<string> MasterCodes { get; set; } = new();
}