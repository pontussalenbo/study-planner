export interface CourseData {
    courseCode: string;
    credits: number;
    cycle: string;
    name_en: string;
    periods?: Record<string, number>[];
}
