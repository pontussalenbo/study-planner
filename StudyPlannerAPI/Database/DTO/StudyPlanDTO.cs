#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class StudyPlanDTO
{
    public string study_plan_name { get; set; } = string.Empty;
    public string programme_code { get; set; } = string.Empty;
    public string year { get; set; } = string.Empty;
}