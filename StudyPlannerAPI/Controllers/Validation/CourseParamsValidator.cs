using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Model.Util;

namespace StudyPlannerAPI.Controllers.Validation;

public class CourseParamsValidator : AbstractValidator<CourseParams>
{
    public CourseParamsValidator()
    {
        RuleFor(cp => cp.Year)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage($"parameter may not be null: {nameof(CourseParams.Year)}");

        RuleFor(cp => cp.Year)
            .Must(year => ModelUtil.IsYearPatternValid(year ?? string.Empty))
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithMessage($"parameter must be formatted correctly: {nameof(CourseParams.Year)}")
            .When(cp => cp.Year != null);

        RuleFor(cp => cp.Programme)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage($"parameter may not be null: {nameof(CourseParams.Programme)}");
    }
}