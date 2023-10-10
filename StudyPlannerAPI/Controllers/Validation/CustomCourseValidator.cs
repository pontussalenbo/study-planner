using FluentValidation;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Extensions;

namespace StudyPlannerAPI.Controllers.Validation;

public class CustomCourseValidator : AbstractValidator<CustomCourseDTO>
{
    public CustomCourseValidator()
    {
        RuleFor(c => c.course_code)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(c => ErrorUtil.ParamNull(nameof(c.course_code).ToCamelCase()));

        RuleFor(c => c.course_name)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(c => ErrorUtil.ParamNull(nameof(c.course_code).ToCamelCase()));

        RuleFor(c => c.level)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithMessage(c => ErrorUtil.ParamNull(nameof(c.course_code).ToCamelCase()));

        RuleFor(c => c.course_code)
            .Must(cc => cc.Length > 0)
            .When(c => c.course_code != null)
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithMessage(c => ErrorUtil.OneChar(nameof(c.course_code).ToCamelCase()));

        RuleFor(c => c.course_name)
            .Must(n => n.Length > 0)
            .When(c => c.course_name != null)
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithMessage(c =>
                $"[{c.course_code}] " + ErrorUtil.OneChar(nameof(c.course_name).ToCamelCase()));

        RuleFor(c => c.level)
            .Must(l => l is Constants.G1_CREDITS or Constants.G2_CREDITS or Constants.A_CREDITS)
            .When(c => c.level != null)
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithMessage(c => $"[{c.course_code}] " + ErrorUtil.InvalidFormat(nameof(c.level).ToCamelCase()));

        RuleFor(c => c.credits)
            .Must(cr => cr > 0)
            .WithErrorCode(ErrorCodes.LEQ_ZERO)
            .WithMessage(c => $"[{c.course_code}] " + ErrorUtil.LeqZero(nameof(c.credits).ToCamelCase()));

        RuleFor(c => c.study_year)
            .Must(y => y > 0)
            .WithErrorCode(ErrorCodes.LEQ_ZERO)
            .WithMessage(c => $"[{c.course_code}] " + ErrorUtil.LeqZero(nameof(c.study_year).ToCamelCase()));

        RuleFor(c => c.period_start)
            .Must(p => p > 0)
            .WithErrorCode(ErrorCodes.LEQ_ZERO)
            .WithMessage(c => $"[{c.course_code}] " + ErrorUtil.LeqZero(nameof(c.period_start).ToCamelCase()));

        RuleFor(c => c.period_end)
            .Must(p => p > 0)
            .WithErrorCode(ErrorCodes.LEQ_ZERO)
            .WithMessage(c => $"[{c.course_code}] " + ErrorUtil.LeqZero(nameof(c.period_end).ToCamelCase()));

        RuleFor(c => new[] { c.period_start, c.period_end })
            .Must(p => p[0] <= p[1])
            .When(c => c.period_start > 0 && c.period_end > 0)
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithMessage(c =>
                $"[{c.course_code}] Param '{nameof(c.period_end).ToCamelCase()}' must be greater than or equal to param '{nameof(c.period_start).ToCamelCase()}'!");
    }
}