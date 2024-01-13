/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 *
 */

using FluentValidation;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Extensions;

namespace StudyPlannerAPI.Controllers.Validation;

internal class CustomCourseMinimalValidator : AbstractValidator<CustomCourseMinimalDTO>
{
    public CustomCourseMinimalValidator()
    {
        RuleFor(c => c.course_code)
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

        RuleFor(c => c.level)
            .Must(l => l is Constants.G1 or Constants.G2 or Constants.A)
            .When(c => c.level != null)
            .WithErrorCode(ErrorCodes.INVALID_FORMAT)
            .WithMessage(c => $"[{c.course_code}] " + ErrorUtil.InvalidFormat(nameof(c.level).ToCamelCase()));

        RuleFor(c => c.credits)
            .Must(cr => cr > 0)
            .WithErrorCode(ErrorCodes.LEQ_ZERO)
            .WithMessage(c => $"[{c.course_code}] " + ErrorUtil.LeqZero(nameof(c.credits).ToCamelCase()));
    }
}