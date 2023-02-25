const generateArrayOfYears = require('./getYears');
const programmes = require('../../data/programmes.json');

/**
 * Array of tables to be generated
 */
const DB_TABLES = [
    'courses',
    'course_programme',
    'course_period',
    'programmes',
    'masters',
    'programme_master',
    'course_master',
    'course_class',
    'course_year'
];

/**
 * Object containing the file paths to the SQL table definitions and the output directories.
 * All paths are relative to the common folder in the project root, to keep output dirs uniform.
 */
const FILE_PATHS = {
    DB_TABLES: 'db/tables',
    DB_TABLES_MAPPINGS: 'db/tables/mappings',
    DB_DATA_OUT_DIR: 'db/data',
    COURSES_DATA_OUT_DIR: 'data',
};

/**
 * All classes available in the LTH api, starting from 2007 and ending with the previous year
 * as the current year is not yet available (due to it has not started yet).
 */
const START_YEAR = 2007;
const END_YEAR = new Date().getFullYear() - 1;
const CLASSES = generateArrayOfYears(START_YEAR, END_YEAR);

const PROGRAMMES = programmes.map((programme) => programme.programmeCode);

/**
 * Map holding the SQL types and their corresponding JSON types
 */
const SqlToJsonType = new Map()
    .set('VARCHAR', 'string')
    .set('CHAR', 'string')
    .set('INT', 'number')
    .set('TEXT', 'string')
    .set('REAL', 'number')
    .set('DOUBLE', 'number')
    .set('INTEGER', 'number');

module.exports = {
    DB_TABLES,
    FILE_PATHS,
    START_YEAR,
    END_YEAR,
    CLASSES,
    PROGRAMMES,
    SqlToJsonType,
};

module.exports.default = module.exports;
