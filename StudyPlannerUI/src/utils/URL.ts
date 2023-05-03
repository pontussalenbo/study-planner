const DEV_URL = 'https://localhost:7266/studyplanner';
const PROD_URL = 'https://study-planner-api.azurewebsites.net/studyplanner';

export const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;

export const COURSES_URL = '/courses';
