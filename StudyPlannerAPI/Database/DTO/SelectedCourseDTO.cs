#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class SelectedCourseDTO
{
    public string course_code { get; set; } = string.Empty;
    public int study_year { get; set; } = -1;

    public int period_start { get; set; } = 0;
    public int period_end { get; set; } = 0;
}