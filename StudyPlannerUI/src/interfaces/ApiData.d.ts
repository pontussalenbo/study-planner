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
        course_code: string;
        course_name_sv: string;
        course_name_en: string;
        credits: number;
        level: string;
        periods: Period[];
    }

    export interface Response {
        courses: API.CourseData[];
    }

    export interface MasterStatus {
        Master: string;
        AdvancedCredits: number;
        G1Credits: number;
        G2Credits: number;
        RequirementsFulfilled: boolean;
    }

    export interface Masters {
        master_code: string;
        master_name_en: string;
        master_name_sv: string;
    }
}
