namespace StudyPlannerAPI.Model;

public interface IMasterRequirementValidator
{
    Task<IDictionary<string, MasterValidationResult>?> ValidateCourseSelection(string programme, string year,
        List<string> selectedCourses, List<string> masterCodes);
}