import generateArrayOfYears from './getYears';

export const DB_TABLES = [
    'courses',
    'programme_master_course_class',
    'programme_master_course_year',
    'course_period_class',
    'course_period_year',
    'programmes',
    'masters',
];

export const DB_FILE_NAME = 'study-planner.db';

export const FILE_PATHS = {
    DB_TABLES: 'db/tables',
    DB_TABLES_MAPPINGS: 'db/tables/mappings',
    DB_DATA_OUT_DIR: 'db/data',
};

export const START_YEAR = 2007;
export const END_YEAR = new Date().getFullYear() - 1;

export const CLASSES = generateArrayOfYears(START_YEAR, END_YEAR);