#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

[Serializable]
public class CourseDTO
{
    public string course_code { get; set; } = string.Empty;
    public string course_name_sv { get; set; } = string.Empty;
    public string course_name_en { get; set; } = string.Empty;
    public float credits { get; set; } = 0;
    public string level { get; set; } = string.Empty;

    public HashSet<PeriodDTO> periods { get; set; } = new();

    public override bool Equals(object obj)
    {
        return obj is not CourseDTO dto || course_code == dto.course_code;
    }

    public override int GetHashCode()
    {
        return course_code.GetHashCode();
    }
}