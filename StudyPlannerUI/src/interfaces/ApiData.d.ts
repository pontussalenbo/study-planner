/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/**
 * This file contains the interfaces for the data returned from the API.
 */
declare namespace API {
    declare const CREDITS_TOTAL_KEY = 'general';
    export interface Period {
        start: number;
        end: number;
    }
    export interface CourseData {
        courseCode: string;
        courseName_sv: string;
        courseName_en: string;
        credits: number;
        level: string;
        periods: Period[];
    }

    export interface Response {
        courses: API.CourseData[];
    }

    export interface MasterStatus {
        master: string;
        advancedCredits: number;
        g1Credits: number;
        g2Credits: number;
        requirementsFulfilled: boolean;
        selectedCourses: string[];
    }

    export interface Master {
        masterCode: string;
        masterName_en: string;
        masterName_sv: string;
    }
}
