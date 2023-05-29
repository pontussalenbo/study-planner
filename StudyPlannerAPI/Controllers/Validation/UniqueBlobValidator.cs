using FluentValidation;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Error;

namespace StudyPlannerAPI.Controllers.Validation;

public class UniqueBlobValidator : AbstractValidator<UniqueBlobDTO>
{
    public UniqueBlobValidator()
    {
        RuleFor(u => u.StudyPlanId)
            .NotNull()
            .WithErrorCode(ErrorCodes.PARAM_NULL)
            .WithErrorCode(ErrorUtil.ParamNull(nameof(UniqueBlobDTO.StudyPlanId)));
        RuleFor(u => u.StudyPlanId)
            .Must(s => s != string.Empty)
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithErrorCode(ErrorUtil.ParamNull(nameof(UniqueBlobDTO.StudyPlanId)));
    }
}