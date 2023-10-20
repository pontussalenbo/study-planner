export interface Filters {
    programme: string;
    year: string;
}

export type TransformFn = (
    courses: CourseData.DataWithLocale[]
) => CourseData.DataWithLocale[] | Promise<CourseData.DataWithLocale[]>;
