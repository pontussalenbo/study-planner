/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

﻿namespace StudyPlannerAPI;

internal class Routes
{
    // Endpoints
    public const string MASTER_CHECK = "studyplanner/masters";
    public const string COURSE_DATA = "studyplanner/courses";
    public const string LINK_SHARE = "studyplanner/links";
    public const string GENERAL_INFO = "studyplanner/general";
    public const string HEALTH_CHECK = "studyplanner/health";

    // Sub-endpoints
    public const string PROGRAMMES = "programmes";
    public const string MASTERS = "masters";
    public const string ACADEMIC_YEARS = "academic_years";
    public const string CLASS_YEARS = "class_years";
    public const string INFO = "info";
    public const string ID = "id";
}