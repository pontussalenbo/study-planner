const generateArrayOfYears = require('./getYears');

const DB_TABLES = [
    'courses',
    'programme_master_course_class',
    'programme_master_course_year',
    'course_period_class',
    'course_period_year',
    'programmes',
    'masters',
];

const DB_FILE_NAME = 'study-planner.db';

const FILE_PATHS = {
    DB_TABLES: 'db/tables',
    DB_TABLES_MAPPINGS: 'db/tables/mappings',
    DB_DATA_OUT_DIR: 'db/data',
};

const START_YEAR = 2007;
const END_YEAR = new Date().getFullYear() - 1;

const CLASSES = generateArrayOfYears(START_YEAR, END_YEAR);

module.exports = {
    DB_TABLES,
    FILE_PATHS,
    START_YEAR,
    END_YEAR,
    CLASSES,
    DB_FILE_NAME,
};

module.exports.default = module.exports;
