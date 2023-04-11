namespace StudyPlannerAPI.Database
{
    [Serializable]
    public class CourseInfoSerializable
    {
        private string? courseCode;
        private string? courseNameSv;
        private string? courseNameEn;
        private string? credits;
        private string? level;
        private string? programmeCode;
        private string? year;

        public CourseInfoSerializable() { }

        public string CourseCode { get => courseCode ?? ""; set => courseCode = value; }
        public string CourseNameSv { get => courseNameSv ?? ""; set => courseNameSv = value; }
        public string CourseNameEn { get => courseNameEn ?? ""; set => courseNameEn = value; }
        public string Credits { get => credits ?? ""; set => credits = value; }
        public string Level { get => level ?? ""; set => level = value; }
        public string? ProgrammeCode { get => programmeCode ?? ""; set => programmeCode = value; }
        public string? Year { get => year ?? ""; set => year = value; }
    }
}
