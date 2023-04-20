﻿#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public class PeriodDTO
{
    public PeriodDTO(int start, int end)
    {
        this.start = start;
        this.end = end;
    }

    public int start { get; set; }
    public int end { get; set; }

    public override bool Equals(object? obj)
    {
        if (obj is not PeriodDTO dto)
        {
            return false;
        }

        return start == dto.start && end == dto.end;
    }

    public override int GetHashCode()
    {
        return start ^ end;
    }
}