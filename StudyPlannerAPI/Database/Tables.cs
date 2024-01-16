/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿namespace StudyPlannerAPI.Database;

internal static class Tables
{
    public const string COURSES = "courses";
    public const string MASTERS = "masters";
    public const string PROGRAMMES = "programmes";

    public const string STUDY_PLAN = "study_plan";
    public const string STUDY_PLAN_COURSE = "study_plan_course";
    public const string STUDY_PLAN_CUSTOM_COURSE = "study_plan_custom_course";

    public const string PROGRAMME_MASTER_COURSE_CLASS = "programme_master_course_class";
    public const string PROGRAMME_MASTER_COURSE_YEAR = "programme_master_course_year";
    public const string COURSE_PERIOD_CLASS = "course_period_class";
    public const string COURSE_PERIOD_YEAR = "course_period_year";
}