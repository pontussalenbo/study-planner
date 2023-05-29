namespace StudyPlannerAPI.Model;

public interface IMasterRequirementValidator
{
    Task<IList<MasterValidationResult>> ValidateCourseSelection(string programme, string year,
        List<string> selectedCourses,
        List<string> masterCodes);
}