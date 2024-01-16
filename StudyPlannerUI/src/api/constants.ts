/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

export const CREDITS_TOTAL_KEY = 'General';
export const MASTERS_SUMMARY_NAME = 'summary';

const DEV_URL = 'https://localhost:7266/studyplanner';
const PROD_URL = 'https://studyplanner-api-5b6c45da61c3.herokuapp.com/studyplanner';

export const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;

export const Endpoints = {
    courses: '/courses',
    studyPlan: '/studyplan',
    classYears: '/general/class_years',
    academicYears: '/general/academic_years',
    masters: '/general/masters',
    programmes: '/general/programmes',
    masterCheck: '/masters',
    savePlan: '/links',
    studyplanCourses: '/courses/info'
} as const;
