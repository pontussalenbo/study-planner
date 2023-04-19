using StudyPlannerAPI.Controllers.Params;

namespace StudyPlannerAPI.Model
{
    public interface IMasterRequirementValidator
    {
        Task<IDictionary<string, MasterValidationResult>?> ValidateCourseSelection(MasterCheckParams masterCheckParams);
    }
}
