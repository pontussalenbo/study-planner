namespace StudyPlannerAPI.Database
{
    [Serializable]
    public class CourseInfoSerializable
    {
        public string? course_code { get; set; }
        public string? course_name_sv { get; set; }
        public string? course_name_en { get; set; }
        public string? credits { get; set; }
        public string? level { get; set; }
        public CourseInfoSerializable() { }
    }
}
