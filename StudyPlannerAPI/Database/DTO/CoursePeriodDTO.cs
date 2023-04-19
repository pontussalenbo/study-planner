namespace StudyPlannerAPI.Database.DTO
{
    public class CoursePeriodDTO
    {
#pragma warning disable IDE1006 // Naming Styles
        public string course_code { get; set; } = string.Empty;
        public int period_start { get; set; }
        public int period_end { get; set; }
#pragma warning restore IDE1006
    }
}
