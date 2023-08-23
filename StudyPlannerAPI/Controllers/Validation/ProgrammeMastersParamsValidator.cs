using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers.Validation;

public class ProgrammeMastersParamsValidator : AbstractValidator<ProgrammeMastersParams>
{
    public ProgrammeMastersParamsValidator()
    {
        RuleFor(p => p.Year)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(ErrorUtil.ParamNull(nameof(ProgrammeMastersParams.Year)));

        RuleFor(p => p.Year)
            .Must(ModelUtil.IsYearPatternValid)
            .When(p => p.Year != null)
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithMessage(ErrorUtil.InvalidFormat(nameof(ProgrammeMastersParams.Year)));

        RuleFor(p => p.Programme)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(ErrorUtil.ParamNull(nameof(ProgrammeMastersParams.Programme)));
    }
}