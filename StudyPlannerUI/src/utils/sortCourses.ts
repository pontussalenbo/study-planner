import { DEFAULT_LANG } from 'interfaces/constants';

export function sortCourses<T extends CourseData.DataWithLocale>(courses: T[]): T[] {
    return courses.sort((a, b) => {
        // Assuming that there's at least one period in the periods array for each course
        const aPeriod = a.period ?? a.periods[0];
        const bPeriod = b.period ?? b.periods[0];

        if (aPeriod.start !== bPeriod.start) {
            return aPeriod.start - bPeriod.start; // Sort by start period
        } else if (aPeriod.end !== bPeriod.end) {
            return aPeriod.end - bPeriod.end; // Sort by end period if starts are the same
        } else {
            // Sort by course_code if both starts and ends are the same
            return a.courseCode.localeCompare(b.courseCode);
        }
    });
}

export const getDisplayPeriod = (period: API.Period) => {
    const { start, end } = period;

    return start !== end ? `${period.start} \u2192 ${end}` : period.start;
};

export function dataParser(
    data: API.CourseData[] | null,
    locale: CourseData.COURSE_NAME = DEFAULT_LANG
): CourseData.DataWithLocale[] {
    if (!data) return [];

    return data.map(course => {
        const { courseCode, credits, level, periods } = course;
        const courseName = course[locale];
        const courseName_other =
            locale === DEFAULT_LANG ? course.courseName_sv : course.courseName_en;
        return { courseCode, courseName, courseName_other, level, credits, periods };
    });
}
