declare namespace CourseData {
  export type COURSE_NAME = 'course_name_sv' | 'course_name_en';

  export interface DataWithLocale extends Omit<API.CourseData, COURSE_NAME> {
    course_name: string;
  }
}
