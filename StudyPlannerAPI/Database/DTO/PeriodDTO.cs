using System.Text.Json.Serialization;

#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

/// <summary>
///     Data transfer object for a study period
/// </summary>
public class PeriodDTO
{
    /// <summary>
    ///     Constructor
    /// </summary>
    /// <param name="start"></param>
    /// <param name="end"></param>
    public PeriodDTO(int start, int end)
    {
        this.start = start;
        this.end = end;
    }

    /// <summary>
    ///     Period start
    /// </summary>
    [JsonPropertyName(Constants.START)]
    public int start { get; set; }

    /// <summary>
    ///     Period end
    /// </summary>
    [JsonPropertyName(Constants.END)]
    public int end { get; set; }

    /// <summary>
    ///     Compare period objects
    /// </summary>
    /// <param name="obj"></param>
    /// <returns>true if both start and end is the same</returns>
    public override bool Equals(object obj)
    {
        if (obj is not PeriodDTO dto)
        {
            return false;
        }

        return start == dto.start && end == dto.end;
    }

    /// <summary>
    ///     Generic hashcode implementation
    /// </summary>
    /// <returns></returns>
    public override int GetHashCode()
    {
        return start ^ end;
    }
}