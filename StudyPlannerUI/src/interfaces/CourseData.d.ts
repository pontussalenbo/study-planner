/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

declare namespace CourseData {
    export type COURSE_NAME = 'courseName_sv' | 'courseName_en';

    export type YEAR = 4 | 5;

    export interface DataWithLocale extends Omit<API.CourseData, COURSE_NAME> {
        courseName: string;
        period?: API.Period | null;
        courseName_other?: string;
    }

    interface SelectedCourse extends DataWithLocale {
        studyYear: YEAR;
        period: API.Period | null;
        custom?: boolean;
    }
}
