using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface IGeneralInfoManager
{
    public Task<IList<string>> GetProgrammes();
    public Task<IList<string>> GetAcademicYears();
    public Task<IList<string>> GetClassYears();
    public Task<IList<MasterDTO>> GetMasters(string programme, string year);
}