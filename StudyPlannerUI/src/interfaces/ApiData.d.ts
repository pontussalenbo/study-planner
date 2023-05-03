/**
 * This file contains the interfaces for the data returned from the LTH API.
 */
declare namespace API {
  export type Master = 'pg' | 'sv' | 'si';
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
    [key: Master]: {
      G1Credits: number;
      G2Credits: number;
      AdvancedCredits: number;
      RequirementsFulfilled: boolean;
    };
  }
}
