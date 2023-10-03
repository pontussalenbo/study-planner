declare namespace CourseData {
    export type COURSE_NAME = 'course_name_sv' | 'course_name_en';

    export type YEAR = 4 | 5;

    export interface DataWithLocale extends Omit<API.CourseData, COURSE_NAME> {
        course_name: string;
    }

    interface SelectedCourse extends DataWithLocale {
        selectedYear: YEAR;
        selectedPeriod: API.Period | null;
    }
}
