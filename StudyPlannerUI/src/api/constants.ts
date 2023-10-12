export const CREDITS_TOTAL_KEY = 'General';
export const MASTERS_SUMMARY_NAME = 'summary';

const DEV_URL = 'https://localhost:7266/studyplanner';
const PROD_URL = 'https://study-planner-api.azurewebsites.net/studyplanner';

export const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;

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
