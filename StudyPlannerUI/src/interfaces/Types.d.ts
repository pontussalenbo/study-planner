export interface Filters {
    Programme: string;
    Year: string;
}

export type TransformFn = (
    courses: CourseData.DataWithLocale[]
) => CourseData.DataWithLocale[] | Promise<CourseData.DataWithLocale[]>;
