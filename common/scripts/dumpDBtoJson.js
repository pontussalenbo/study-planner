/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

const shell = require('shelljs');

const dbs = [
    'courses_info',
    'masters',
    'programmes',
    'course_period',
    'programme_course',
    'programme_master',
    'course_class',
    'master_course',
];

function dumpDB() {
    dbs.forEach((file) => {
        shell.exec(`cat ./db/data/${file}.sql | sqlite3 database.db`);
        // shell.exec(`sqlite3 db.sqlite3 ".read ./db/tables/${file}.sql"`);
    });

    dbs.forEach((file) => {
        shell.exec(`sqlite3 database.db ".mode json" ".once ./db/data/json/${file}.json" "select * from ${file}"`);
    });
}

module.exports = dumpDB;
module.exports.default = module.exports;
