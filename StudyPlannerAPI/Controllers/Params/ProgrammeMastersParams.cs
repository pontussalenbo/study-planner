using System.Text.Json.Serialization;

namespace StudyPlannerAPI.Controllers.Params;

public class ProgrammeMastersParams
{
    [JsonPropertyName(Constants.PROGRAMME)]
    public string Programme { get; set; }

    [JsonPropertyName(Constants.YEAR)]
    public string Year { get; set; }
}