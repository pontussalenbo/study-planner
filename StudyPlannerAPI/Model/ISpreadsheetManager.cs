using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface ISpreadsheetManager
{
    public Task<MemoryStream> CreateSpreadsheetFromPlan(string programme, string year, List<string> masters,
        List<SelectedCourseDTO> courses, string name);
}