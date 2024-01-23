/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { Endpoints } from 'api/constants';
import { Filters } from 'interfaces/Types';
import { GET, POST } from 'utils/fetch';

export interface CourseFilters extends Filters {
    masterCodes: string[] | undefined;
}

export enum FILTERS {
    Year = 'Academic Year',
    Class = 'Class',
    None = ''
}

export type ClassYearFilter = Exclude<FILTERS, FILTERS.None>;
export type Filter = keyof typeof FILTERS;
export type FilterValue = (typeof FILTERS)[Filter];

export function getCoursesByProgramme(filters: CourseFilters, signal?: AbortController) {
    return POST<API.CourseData[]>(Endpoints.courses, filters, signal);
}

export interface StudyPlanCourse {
    courseName_en: string;
    courseName_sv: string;
    level: string;
    credits: number;
}

export type StudyPlanCoursesResponse = {
    [courseCode: string]: StudyPlanCourse;
};

export function getCourseInfoByCode(courseCodes: string[]) {
    const body = { courseCodes };
    return POST<StudyPlanCoursesResponse>(Endpoints.studyplanCourses, body);
}

const urls = {
    [FILTERS.Class]: Endpoints.classYears,
    [FILTERS.Year]: Endpoints.academicYears
} as const;

export function getFilterByValues(filterType: ClassYearFilter, signal?: AbortController) {
    const url = urls[filterType];
    return GET<string[]>(url, undefined, signal);
}
