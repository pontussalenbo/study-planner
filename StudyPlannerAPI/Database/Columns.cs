/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

namespace StudyPlannerAPI.Database;

internal static class Columns
{
    // Implicit column in each table
    public const string ROW_ID = "id";

    // courses
    public const string COURSE_CODE = "course_code";
    public const string LEVEL = "level";
    public const string CREDITS = "credits";
    public const string COURSE_NAME = "course_name";
    public const string COURSE_NAME_SV = $"{COURSE_NAME}_sv";
    public const string COURSE_NAME_EN = $"{COURSE_NAME}_en";

    // programmes
    public const string PROGRAMME_CODE = "programme_code";

    // masters
    public const string MASTER_CODE = "master_code";
    public const string MASTER_NAME_SV = "master_name_sv";
    public const string MASTER_NAME_EN = "master_name_en";

    // years
    public const string CLASS_YEAR = "class_year";
    public const string ACADEMIC_YEAR = "academic_year";

    // study plan
    public const string YEAR = "year";
    public const string STUDY_PLAN_ID = "study_plan_id";
    public const string STUDY_PLAN_READ_ONLY_ID = "study_plan_read_only_id";
    public const string STUDY_PLAN_NAME = "study_plan_name";
    public const string STUDY_YEAR = "study_year";

    public const string PERIOD_START = "period_start";
    public const string PERIOD_END = "period_end";

    public const string ELECTABILITY = "electability";
}