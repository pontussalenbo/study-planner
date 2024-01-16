/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

namespace StudyPlannerAPI;

internal class Constants
{
    public const string CORS_POLICY = "defaultCorsPolicy";

    public const string AZURE_HOST = "AzureHost";
    public const string MAIN_DOMAIN = "MainDomain";
    public const string ORIGINS = "Origins";

    public const string CONNECTION_STRING = "ConnectionString";
    public const string DATABASE_URL = "DATABASE_URL";
    public const string CONNECTION_STRING_PREFIX = "Data Source=";

    public const string LEVEL = "level";
    public const string A = "A";
    public const string G1 = "G1";
    public const string G2 = "G2";

    public const string GENERAL = "general";
    public const string SUMMARY = "summary";
    public const string ELECTIVE = "elective";
    public const string EXTERNAL_ELECTIVE = "external_elective";

    public const string STUDY_PLAN_NAME_DEFAULT = "My study plan";

    public const string COURSE_CODES = "courseCodes";

    public const int REQUIRED_A_CREDITS_TOTAL = 45;
    public const int REQUIRED_A_CREDITS_MASTER = 30;
    public const int REQUIRED_CREDITS_TOTAL = 90;
    public const int REQUIRED_CREDITS_MASTER = 45;

    public const string STUDY_PLAN_NAME = "studyPlanName";
    public const string STUDY_PLAN_ID = "studyPlanId";
    public const string STUDY_PLAN_READ_ONLY_ID = "studyPlanReadOnlyId";
    public const string COURSE_CODE = "courseCode";
    public const string MASTER_CODE = "masterCode";
    public const string MASTER_CODES = "masterCodes";
    public const string SELECTED_COURSES = "selectedCourses";
    public const string CUSTOM_COURSES = "customCourses";
    public const string MASTER_NAME_SV = "masterName_sv";
    public const string MASTER_NAME_EN = "masterName_en";
    public const string COURSE_NAME = "courseName";
    public const string COURSE_NAME_SV = "courseName_sv";
    public const string COURSE_NAME_EN = "courseName_en";
    public const string PROGRAMME = "programme";
    public const string YEAR = "year";
    public const string PERIOD_START = "periodStart";
    public const string PERIOD_END = "periodEnd";
    public const string START = "start";
    public const string END = "end";
    public const string STUDY_YEAR = "studyYear";
    public const string PROGRAMME_CODE = "programmeCode";
    public const string REQUIREMENTS_FULFILLED = "requirementsFulfilled";
    public const string CREDITS = "credits";
    public const string G1_CREDITS = "g1Credits";
    public const string G2_CREDITS = "g2Credits";
    public const string ADVANCED_CREDITS = "advancedCredits";
    public const string MASTER = "master";
    public const string IS_READ_ONLY = "isReadOnly";
    public const string PERIOD = "period";
}