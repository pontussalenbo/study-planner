export function dataParser(
    data: API.Response | null,
    locale: CourseData.COURSE_NAME
): CourseData.DataWithLocale[] {
    if (!data) return [];

    return data.courses.map(course => {
        const { course_code, credits, level, periods } = course;
        const course_name = course[locale];
        return { course_code, course_name, level, credits, periods };
    });
}