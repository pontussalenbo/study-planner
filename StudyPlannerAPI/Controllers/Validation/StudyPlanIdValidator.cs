using FluentValidation;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers.Validation;

public class StudyPlanIdValidator : AbstractValidator<StudyPlanIdResult>
{
    public StudyPlanIdValidator()
    {
        RuleFor(u => u.StudyPlanId)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithErrorCode(ErrorUtil.ParamNull(nameof(StudyPlanIdResult.StudyPlanId)));
    }
}