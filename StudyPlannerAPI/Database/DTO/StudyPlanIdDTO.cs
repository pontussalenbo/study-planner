#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class StudyPlanIdDTO
{
    public string study_plan_id { get; set; } = string.Empty;
    public string study_plan_read_only_id { get; set; } = string.Empty;

    public bool IsValid()
    {
        return study_plan_id != string.Empty && study_plan_read_only_id != string.Empty;
    }
}