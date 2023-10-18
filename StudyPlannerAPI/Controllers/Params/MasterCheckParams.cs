using System.Text.Json.Serialization;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Controllers.Params;

/// <summary>
///     Parameter DTO for master check
/// </summary>
public class MasterCheckParams
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
    ///     Master code
    /// </summary>
    [JsonPropertyName(Constants.MASTER_CODES)]
    public List<string> MasterCodes { get; set; } = new();

    /// <summary>
    ///     List of selected courses
    /// </summary>
    [JsonPropertyName(Constants.SELECTED_COURSES)]
    public List<string> SelectedCourses { get; set; } = new();

    public List<CustomCourseMinimalDTO> CustomCourses { get; set; } = new();
}