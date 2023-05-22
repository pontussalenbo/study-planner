using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Model.Util;

namespace StudyPlannerAPI.Controllers.Validation;

public class MasterCheckParamsValidator : AbstractValidator<MasterCheckParams>
{
    public MasterCheckParamsValidator()
    {
        RuleFor(mcp => mcp.Year)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(ErrorUtil.ParamNull(nameof(MasterCheckParams.Year)));

        RuleFor(mcp => mcp.Year)
            .Must(year => ModelUtil.IsYearPatternValid(year ?? string.Empty))
            .When(mcp => mcp.Year != null)
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithMessage(ErrorUtil.InvalidFormat(nameof(MasterCheckParams.Year)));

        RuleFor(mcp => mcp.Programme)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(ErrorUtil.ParamNull(nameof(MasterCheckParams.Programme)));

        RuleFor(mcp => mcp.SelectedCourses)
            .Must(courses => courses.Count > 0)
            .WithErrorCode(ErrorCodes.COUNT_LEQ_ZERO)
            .WithMessage(ErrorUtil.LeqZero(nameof(MasterCheckParams.SelectedCourses)));
    }
}