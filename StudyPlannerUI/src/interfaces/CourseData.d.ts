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
