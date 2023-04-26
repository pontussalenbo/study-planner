const DEV_URL = 'http://localhost:3000';
const PROD_URL = 'http://localhost:3000';

export const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;
