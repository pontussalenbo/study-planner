const generateArrayOfYears = require('./getYears');
const programmes = require('../../data/programmes.json');

const DB_TABLES = [
    'courses_info',
    'programme_course',
    'course_period',
    'programmes',
    'masters',
    'programme_master',
    'master_course',
    'course_class'
];

const FILE_PATHS = {
    DB_TABLES: 'db/tables',
    DB_TABLES_MAPPINGS: 'db/tables/mappings',
    DB_DATA_OUT_DIR: 'db/data',
};

const START_YEAR = 2007;
const END_YEAR = new Date().getFullYear() - 1;

const CLASSES = generateArrayOfYears(START_YEAR, END_YEAR);

const PROGRAMMES = programmes.map((programme) => programme.programmeCode);

module.exports = {
    DB_TABLES,
    FILE_PATHS,
    START_YEAR,
    END_YEAR,
    CLASSES,
    PROGRAMMES,
};

module.exports.default = module.exports;
