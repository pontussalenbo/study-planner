using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers.Validation;

public class CourseParamsValidator : AbstractValidator<CourseParams>
{
    public CourseParamsValidator()
    {
        RuleFor(cp => cp.Year)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(ErrorUtil.ParamNull(nameof(CourseParams.Year)));

        RuleFor(cp => cp.Year)
            .Must(ModelUtil.IsYearPatternValid)
            .When(cp => cp.Year != null)
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithMessage(ErrorUtil.InvalidFormat(nameof(CourseParams.Year)));

        RuleFor(cp => cp.Programme)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(ErrorUtil.ParamNull(nameof(CourseParams.Programme)));
    }
}