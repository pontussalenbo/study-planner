export type TransformFn = (
  courses: CourseData.DataWithLocale[]
) => CourseData.DataWithLocale[] | Promise<CourseData.DataWithLocale[]>;
