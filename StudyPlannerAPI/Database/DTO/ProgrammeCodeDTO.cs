#pragma warning disable IDE1006
namespace StudyPlannerAPI.Database.DTO;

public record ProgrammeCodeDTO
{
    public string programme_code { get; set; } = string.Empty;
}