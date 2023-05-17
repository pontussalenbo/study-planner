using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Model.Util;

namespace StudyPlannerAPI.Controllers.Validation;

public class MasterCheckParamsValidator : AbstractValidator<MasterCheckParams>
{
    public MasterCheckParamsValidator()
    {
        RuleFor(mcp => mcp.Year)
            .NotNull()
            .WithErrorCode(Constants.PARAM_NULL)
            .WithMessage(ValidationUtil.ParamNull(nameof(MasterCheckParams.Year)));

        RuleFor(mcp => mcp.Year)
            .Must(year => ModelUtil.IsYearPatternValid(year ?? string.Empty))
            .WithErrorCode(Constants.INVALID_FORMAT)
            .WithMessage(ValidationUtil.InvalidFormat(nameof(MasterCheckParams.Year)))
            .When(mcp => mcp.Year != null);

        RuleFor(mcp => mcp.Programme)
            .NotNull()
            .WithErrorCode(Constants.PARAM_NULL)
            .WithMessage(ValidationUtil.ParamNull(nameof(MasterCheckParams.Programme)));

        RuleFor(mcp => mcp.SelectedCourses)
            .Must(courses => courses.Count > 0)
            .WithErrorCode(Constants.COUNT_LEQ_ZERO)
            .WithMessage(ValidationUtil.LeqZero(nameof(MasterCheckParams.SelectedCourses)));
    }
}