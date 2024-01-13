/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This file is generated from the LTH API documentation.
 */

export interface StudyPeriod {
    lecture: number;
    exercise: number;
    laborations: number;
    project: number;
    selfStudies: number;
}

export interface TimePlan {
    startSpNr: number;
    endSpNr: number;
    studyPeriods: (StudyPeriod | null)[];
}

export interface CourseData {
    courseId: number;
    courseCode: string;
    academicYearId: string;
    academicYear: string;
    academicYearShort: string;
    name_sv: string;
    name_en: string;
    gradingScale: string;
    credits: string;
    cycle: string;
    type: string;
    status: string;
    oldCourseCode?: any;
    newCourseCode?: any;
    homePage_sv: string;
    homePage_en: string;
    languageCode: string;
    language_sv: string;
    language_en: string;
    departmentCode: string;
    department_sv: string;
    department_en: string;
    motherDepartmentCode: string;
    motherDepartment_sv: string;
    motherDepartment_en: string;
    maxParticipants: number | null;
    entryRequirements: number;
    assumedPriorKnowledge: number;
    timeeditUrl_sv: string;
    timeeditUrl_en: string;
    evaluationUrl_sv: string;
    evaluationUrl_en: string;
    courseSyllabusPath_sv: string;
    courseSyllabusPath_en: string;
    suitableForeignStudents: boolean;
    hasChanges: number;
    preliminary: boolean;
    id: number;
    courseProgrammeId: number;
    groupId: string;
    sortOrder: string;
    programmeStatus: string;
    year: number;
    fromYear: number;
    choice: string;
    choiceShort: string;
    programmeCode: string;
    programme_sv: string;
    programme_en: string;
    specialisationCode: string;
    specialisation_sv: string;
    specialisation_en: string;
    specialisationGeneral: number;
    footnote_sv: string | null;
    footnote_en: string | null;
    timePlans: TimePlan[];
}

export interface CourseDataWithClass extends CourseData {
    class: string;
}

interface Period {
    periodStart: number;
    periodEnd: number;
}

interface CourseDataWithPeriods extends Omit<CourseData, "timePlans"> {
    class: string;
    periods: Period[];
}