#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class CoursePeriodDTO
{
    public string course_code { get; set; } = string.Empty;
    public int period_start { get; set; } = -1;
    public int period_end { get; set; } = -1;
}