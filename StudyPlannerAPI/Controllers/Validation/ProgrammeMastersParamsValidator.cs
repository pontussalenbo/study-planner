/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers.Validation;

internal class ProgrammeMastersParamsValidator : AbstractValidator<ProgrammeMastersParams>
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