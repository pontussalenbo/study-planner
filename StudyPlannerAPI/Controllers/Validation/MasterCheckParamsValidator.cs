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

internal class MasterCheckParamsValidator : AbstractValidator<MasterCheckParams>
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
            .WithMessage(ErrorUtil.CountLeqZero(nameof(MasterCheckParams.SelectedCourses)));
    }
}