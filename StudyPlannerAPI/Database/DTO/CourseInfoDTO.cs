namespace StudyPlannerAPI.Database.DTO
{
    [Serializable]
    public class CourseInfoDTO
    {
#pragma warning disable IDE1006 // Naming Styles
        public string course_code { get; set; } = string.Empty;
        public string course_name_sv { get; set; } = string.Empty;
        public string course_name_en { get; set; } = string.Empty;
        public float credits { get; set; } = 0;
        public string level { get; set; } = string.Empty;

        public HashSet<PeriodDTO> periods { get; set; } = new();
        public CourseInfoDTO() { }
#pragma warning restore IDE1006

        public override bool Equals(object? obj)
        {
            if (obj is not CourseInfoDTO dto)
            {
                return false;
            }
            else
            {
                return course_code == dto.course_code;
            }
        }

        public override int GetHashCode()
        {
            return course_code.GetHashCode();
        }
    }
}
