namespace StudyPlannerAPI.Model;

public interface IMasterRequirementValidator
{
    Task<IDictionary<string, MasterValidationResult>?> ValidateCourseSelection(string programme, string classYear,
        string academicYear, List<string> selectedCourses, List<string> masterCodes);
}