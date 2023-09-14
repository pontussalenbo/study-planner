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

interface Period {
    start: number;
    end: number;
}

export const getDisplayPeriod = (period: Period) => {
    const { start, end } = period;

    return start !== end ? `${period.start} \u2192 ${end}` : period.start;
};
