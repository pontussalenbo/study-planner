using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface ISpreadsheetManager
{
    public Task<Stream> CreateSpreadsheetFromPlan(string programme, string year, List<string> masters,
        List<SelectedCourseDTO> courses, string name);
}