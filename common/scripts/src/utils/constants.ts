/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

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

const DB_TABLES_DIR = '../../db/tables';
const DB_TABLES_MAPPINGS = DB_TABLES_DIR + '/mappings';
const DB_DATA_OUT_DIR = '../../db/data';


export const FILE_PATHS = {
    DB_TABLES: DB_TABLES_DIR,
    DB_TABLES_MAPPINGS,
    DB_DATA_OUT_DIR,
}


export const START_YEAR = 2007;
export const END_YEAR = new Date().getFullYear() - 1;

export const CLASSES = generateArrayOfYears(START_YEAR, END_YEAR);
