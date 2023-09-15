// TODO: Move to utils folder

const DEFAULT_LANG = 'course_name_en';

export function dataParser(
    data: API.CourseData[] | null,
    locale: CourseData.COURSE_NAME = DEFAULT_LANG
): CourseData.DataWithLocale[] {
    if (!data) return [];

    return data.map(course => {
        const { course_code, credits, level, periods } = course;
        const course_name = course[locale];
        return { course_code, course_name, level, credits, periods };
    });
}
