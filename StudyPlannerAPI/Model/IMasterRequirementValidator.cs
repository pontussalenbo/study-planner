namespace StudyPlannerAPI.Model;

public interface IMasterRequirementValidator
{
    Task<List<MasterValidationResult>> ValidateCourseSelection(string programme, string year,
        List<string> selectedCourses, List<string> masterCodes);
}