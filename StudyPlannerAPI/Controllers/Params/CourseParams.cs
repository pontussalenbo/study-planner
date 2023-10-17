using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Controllers.Params;

public class CourseParams
{
    [JsonPropertyName(Constants.PROGRAMME)]
    public string Programme { get; set; }

    [JsonPropertyName(Constants.YEAR)]
    public string Year { get; set; }

    [JsonPropertyName(Constants.MASTER_CODES)]
    public List<string> MasterCodes { get; set; } = new();
}