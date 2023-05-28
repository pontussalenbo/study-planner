"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLASSES = exports.END_YEAR = exports.START_YEAR = exports.FILE_PATHS = exports.DB_FILE_NAME = exports.DB_TABLES = void 0;
const getYears_1 = __importDefault(require("./getYears"));
exports.DB_TABLES = [
    'courses',
    'programme_master_course_class',
    'programme_master_course_year',
    'course_period_class',
    'course_period_year',
    'programmes',
    'masters',
];
exports.DB_FILE_NAME = 'study-planner.db';
exports.FILE_PATHS = {
    DB_TABLES: 'db/tables',
    DB_TABLES_MAPPINGS: 'db/tables/mappings',
    DB_DATA_OUT_DIR: 'db/data',
};
exports.START_YEAR = 2007;
exports.END_YEAR = new Date().getFullYear() - 1;
exports.CLASSES = (0, getYears_1.default)(exports.START_YEAR, exports.END_YEAR);
