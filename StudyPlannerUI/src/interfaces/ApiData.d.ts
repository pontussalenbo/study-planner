/**
 * This file contains the interfaces for the data returned from the LTH API.
 */
declare namespace API {
  export type Master = 'pg' | 'sv' | 'si';
  export interface Period {
    Start: number;
    End: number;
  }
  export interface CourseData {
    course_code: string;
    course_name_sv: string;
    course_name_en: string;
    credits: number;
    level: string;
    periods: Period[];
  }

  export interface MasterStatus {
    [key: Master]: {
      G1Credits: number;
      G2Credits: number;
      AdvancedCredits: number;
      RequirementsFulfilled: boolean;
    };
  }

  export interface Response {
    courses: API.CourseData[];
  }
}