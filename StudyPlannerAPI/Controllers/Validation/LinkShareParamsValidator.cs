using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers.Validation;

internal class LinkShareParamsValidator : AbstractValidator<LinkShareParams>
{
    public LinkShareParamsValidator()
    {
        RuleFor(lsp => lsp.Year)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(ErrorUtil.ParamNull(nameof(LinkShareParams.Year)));

        RuleFor(lsp => lsp.Programme)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(ErrorUtil.ParamNull(nameof(LinkShareParams.Programme)));

        RuleFor(lsp => lsp.Year)
            .Must(ModelUtil.IsYearPatternValid)
            .When(lsp => lsp.Year != null)
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithMessage(ErrorUtil.InvalidFormat(nameof(LinkShareParams.Year)));

        RuleFor(lsp => lsp.SelectedCourses)
            .Must(courses => courses.Count > 0)
            .WithErrorCode(ErrorCodes.COUNT_LEQ_ZERO)
            .WithMessage(ErrorUtil.CountLeqZero(nameof(LinkShareParams.SelectedCourses)));
    }
}