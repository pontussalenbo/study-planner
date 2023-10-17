export function sortCourses<T extends CourseData.DataWithLocale>(courses: T[]): T[] {
    return courses.sort((a, b) => {
        // Assuming that there's at least one period in the periods array for each course
        const aPeriod = a.periods[0];
        const bPeriod = b.periods[0];

        if (aPeriod.start !== bPeriod.start) {
            return aPeriod.start - bPeriod.start; // Sort by start period
        } else if (aPeriod.end !== bPeriod.end) {
            return aPeriod.end - bPeriod.end; // Sort by end period if starts are the same
        } else {
            // Sort by course_code if both starts and ends are the same
            return a.course_code.localeCompare(b.course_code);
        }
    });
}

export const getDisplayPeriod = (period: API.Period) => {
    const { start, end } = period;

    return start !== end ? `${period.start} \u2192 ${end}` : period.start;
};

const DEFAULT_LANG = 'course_name_en';

export function dataParser(
    data: API.CourseData[] | null,
    locale: CourseData.COURSE_NAME = DEFAULT_LANG
): CourseData.DataWithLocale[] {
    if (!data) return [];

    return data.map(course => {
        const { course_code, credits, level, periods } = course;
        const course_name = course[locale];
        const course_name_other =
            locale === DEFAULT_LANG ? course.course_name_sv : course.course_name_en;
        return { course_code, course_name, course_name_other, level, credits, periods };
    });
}
