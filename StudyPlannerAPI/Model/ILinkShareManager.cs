using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface ILinkShareManager
{
    Task<UniqueBlobDTO> GetUniqueBlobFromPlan(string programme, string year, List<string> masters,
        List<SelectedCourseDTO> selectedCourses, string studyPlanName);

    Task<LinkShareDTO> GetPlanFromUniqueBlob(string uniqueBlob);
}