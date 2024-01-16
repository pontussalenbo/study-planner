/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

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