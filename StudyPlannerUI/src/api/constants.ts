export const CREDITS_TOTAL_KEY = 'General';
export const MASTERS_SUMMARY_NAME = 'summary';

const DEV_URL = 'https://localhost:7266/studyplanner';
const PROD_URL = 'https://studyplanner-api-5b6c45da61c3.herokuapp.com/studyplanner';

export const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;

export const Endpoints = {
    courses: '/courses',
    studyPlan: '/studyplan',
    classYears: '/general/class_years',
    academicYears: '/general/academic_years',
    masters: '/general/masters',
    programmes: '/general/programmes',
    masterCheck: '/masters',
    savePlan: '/links',
    studyplanCourses: '/courses/info'
} as const;
