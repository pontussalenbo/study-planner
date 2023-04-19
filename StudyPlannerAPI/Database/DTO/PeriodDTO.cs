namespace StudyPlannerAPI.Database.DTO
{
    public class PeriodDTO
    {
#pragma warning disable IDE1006 // Naming Styles
        public int start { get; set; }
        public int end { get; set; }
#pragma warning restore IDE1006

        public PeriodDTO(int start, int end)
        {
            this.start = start;
            this.end = end;
        }

        public override bool Equals(object? obj)
        {
            if (obj is not PeriodDTO dto)
            {
                return false;
            }
            else
            {
                return start == dto.start && end == dto.end;
            }
        }

        public override int GetHashCode()
        {
            return start ^ end;
        }
    }
}
