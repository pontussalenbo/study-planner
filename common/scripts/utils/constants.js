const DB_TABLES = [
    'courses_info',
    'programme_course',
    'course_period',
    'programmes',
    'masters',
    'programme_masters',
    'master_courses',
];

const FILE_PATHS = {
    DB_TABLES: 'db/tables',
    DB_TABLES_MAPPINGS: 'db/tables',
    DB_DATA_OUT_DIR: 'db/data',
};

module.exports = {
    DB_TABLES,
    FILE_PATHS,
};

module.exports.default = module.exports;
