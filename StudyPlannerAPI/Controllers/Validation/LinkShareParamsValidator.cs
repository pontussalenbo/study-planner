using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Model.Util;

namespace StudyPlannerAPI.Controllers.Validation;

public class LinkShareParamsValidator : AbstractValidator<LinkShareParams>
{
    public LinkShareParamsValidator()
    {
        RuleFor(lsp => lsp.Year)
            .NotNull()
            .WithErrorCode(Constants.PARAM_NULL)
            .WithMessage(ValidationUtil.ParamNull(nameof(LinkShareParams.Year)));

        RuleFor(lsp => lsp.Programme)
            .NotNull()
            .WithErrorCode(Constants.PARAM_NULL)
            .WithMessage(ValidationUtil.ParamNull(nameof(LinkShareParams.Programme)));

        RuleFor(lsp => lsp.Year)
            .Must(ModelUtil.IsYearPatternValid)
            .WithErrorCode(Constants.INVALID_FORMAT)
            .WithMessage(ValidationUtil.InvalidFormat(nameof(LinkShareParams.Year)))
            .When(lsp => lsp.Year != null);

        RuleFor(lsp => lsp.SelectedCourses)
            .Must(courses => courses.Count > 0)
            .WithErrorCode(Constants.COUNT_LEQ_ZERO)
            .WithMessage(ValidationUtil.LeqZero(nameof(LinkShareParams.SelectedCourses)));
    }
}