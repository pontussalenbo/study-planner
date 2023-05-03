#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class MasterDTO
{
    public string master_code { get; set; } = string.Empty;
    public string master_name_sv { get; set; } = string.Empty;
    public string master_name_en { get; set; } = string.Empty;
}