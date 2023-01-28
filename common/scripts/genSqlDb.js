const fs = require('fs').promises;
const path = require('path');
const inquirer = require('inquirer');
const { mkdir } = require('fs');
const courses = require('../data/courses.json');
/**
 * Generate array of unique entries by given key
 * @param {array} arr array to remove duplicates entries from
 * @param {*} key key to use for comparison when filtering duplicates
 * @returns array of unique entries
 */
function getUniqueListBy(arr, key) {
    // Generate 2d array holding key value pairs
    const MapItems = arr.map((item) => [item[key], item]);
    // Create a map from the 2d array
    const map = new Map(MapItems);
    // Spread the map into an array and return it
    return [...map.values()];
}

async function readFile(filepath) {
    return fs.readFile(path.join(__dirname, `../${filepath}`), 'utf8');
}

/**
 * Calculates the start and end period(s) of a course. As a course can have multiple timeplans,
 * we need to find the start and end period for each timeplan and return an array of objects
 * containing the start and end period of each timeplan.
 * @param {Course.CourseData} course JSON object containing course data
 * @returns array of objects containing the start and end period of the course
 */
function findCoursePeriods(course) {
    return course.timePlans.map((timePlan) => {
        const periods = timePlan.studyPeriods.map((period, idx) => (period !== null ? idx + 1 : 0))
            .filter((_) => !!_);
        const periodStart = Math.min(...periods);
        const periodEnd = Math.max(...periods);

        return { periodStart, periodEnd };
    });
}

/**
 * Finds the index of a course in the courses array by course code
 * @param {string} courseCode
 * @returns index of the course in the courses array
 */
function findCourseIdx(courseCode) {
    return courses.findIndex((course) => course.courseCode === courseCode);
}

// RESERVED SQL KEYWORDS, DO NOT USE AS JSON KEYS
const SQL_KEYWORDS = ['PRIMARY', 'FOREIGN', 'REFERENCES', 'NOT NULL', 'UNIQUE'];

/**
 * Reads the SQL table definition from .sql file and returns it as a string.
 * Useful for getting the table keys and types.
 * @param {string} table name of the table .
 * @returns string representation of the table definition, i.e the keys and types.
 */
async function getKeyMapfromSQLTable(table) {
    try {
        const data = await readFile(`db/tables/${table}.sql`, 'utf8');
        // Advanced regex to get the string between (...);
        const regex = /(?<=(\()).*?(?=(\);))/s;
        const res = regex.exec(data)[0].trim();
        return res;
    } catch (error) {
    /** Something went wrong :( */
        return console.log(error);
    }
}

/**
 * Map holding the SQL types and their corresponding JSON types
 */
const SqlToJsonType = new Map()
    .set('VARCHAR', 'string')
    .set('CHAR', 'string')
    .set('INT', 'number')
    .set('TEXT', 'string')
    .set('REAL', 'number')
    .set('DOUBLE', 'number');

/**
 * Reads the sql table column to json key mappings from file and returns it as a string
 * @param {string} table name of the table
 * @returns string representation of the table mappings
 */
async function getTableMappings(table) {
    return readFile(`db/tables/${table}_mappings.json`, 'utf8');
}

/**
 *
 * @param {*} tableName
 * @param {*} table
 * @returns {object} array of objects containing the table key, type and json key
 */
async function mapPropToType(tableName, table) {
    // Get the mappings from the json file, i.e which json key corresponds to which sql key
    const mappingsString = await getTableMappings(tableName);
    const mappings = JSON.parse(mappingsString);
    // remove newlines and split on comma, get array of strings containing table keys and types
    const tableStr = table.replace(/\n\s*\n/g, '\n').split('\r\n');
    return tableStr.map((prop) => {
        // Remove beautiful whitespace
        const line = prop.trim().slice(0, -1);
        // If the key is a SQL keyword, we dont want to include it in our json
        const isKeyword = SQL_KEYWORDS.some((x) => line.includes(x));
        if (isKeyword) return null;
        // Get the key and type from the string
        const [key, type] = line.split(' ');

        // Get the type from the string BEFORE the length is defined
        const typeRegex = /^[^\\(]*/;
        const [jsontype] = typeRegex.exec(type);

        return {
            tableKey: key,
            type: SqlToJsonType.get(jsontype),
            jsonKey: mappings[key],
        };
    }).filter((_) => !!_);
}

function getCoursePeriodSQLStmt(course) {
    const periods = findCoursePeriods(course);

    const { courseCode } = course;

    const stmts = periods.map((period, idx) => {
        const { periodStart, periodEnd } = period;
        // When idx is 0, we are at the first period,
        // thus we dont need to append a parenthesis nor add one to the end
        if (idx === 0) {
            return `${period.periodStart}, ${period.periodEnd}`;
        }
        // When our index is not 0, we need to create the full sql value statement,
        // but not adding a parenthesis to the end since that will be handed when joining the array

        return `("${courseCode}", ${periodStart}, ${periodEnd}`;
    });
    // Join the array and add a parenthesis to the end of each substring
    return stmts.join('),\n      ');
}

/**
 * Reads the SQL table from file and returns it as a string
 * @param {string} tableName name of the table definition
 * @returns string representation of the table
 */
async function getSQLTable(tableName) {
    return readFile(`db/tables/${tableName}.sql`, 'utf8');
}
/**
 * This is where the magic happens
 * @param {object} param0 object holding json keyMappings and the table name
 * @returns void
 */
async function genSqlStmt({ jsonKeys, tableName }) {
    // Read SQL table from file
    const table = await getSQLTable(tableName);
    // Add SQL syntax to the beginning of the file
    let SQLStmt = `${table}\nBEGIN TRANSACTION;\n\nINSERT OR REPLACE`;

    console.log(`Generating ${tableName}...`);

    try {
    // Get all table columns as a comma separated string
        const tableKeys = jsonKeys.map((key) => key.tableKey).join(', ');

        SQLStmt += `\nINTO ${tableName}(${tableKeys})\nVALUES`;

        const uniqueCourses = getUniqueListBy(courses, 'courseCode');
        uniqueCourses.map((course) => {
            // Begin the row value statement
            SQLStmt += '\n      (';

            jsonKeys.forEach((key) => {
                const { jsonKey, type } = key;
                // Early return as period start will handle logic for period start and end,
                // since it is one row in our sql table
                if (jsonKey === 'periodEnd') {
                    return;
                }
                /**
                 * Special treatment for period start, since it is a special case
                 * where we need to create multiple rows for each period a course has
                 */
                if (jsonKey === 'periodStart') {
                    const stmt = getCoursePeriodSQLStmt(course);
                    SQLStmt += `${stmt}) `;
                } else {
                    // If the type is a string, we need to add quotes around the value
                    const stmt = type === 'string' ? `'${course[jsonKey]}'` : course[jsonKey];
                    SQLStmt += `${stmt}, `;
                }
            });
            // Evil hack to remove the last comma
            SQLStmt = SQLStmt.slice(0, -2);
            // End the row value statement
            SQLStmt += '),';
        });
        // Remove last comma to prevent syntax error
        const data = SQLStmt.slice(0, -1);
        // create directory if it does not exist
        await fs.mkdir('db/data', { recursive: true });
        // Write to file
        await fs.writeFile(`db/data/${tableName}.sql`, data, 'utf8');
    } catch (error) {
        console.log(`Error generating ${tableName}`);
        console.log(error);
    }
}

// Generate Array of objects with key and value from Map data structure
const mapToArray = (map) => Array.from(map, ([name, value]) => ({ name, value }));

/**
 * ALL MAPPINGS FOR TABLES AND KEYS ARE DEFINED HERE
 */
const COURSES_INFO_TABLE = 'courses_info';
const keyMapCoursesInfo = [
    {
        jsonKey: 'courseCode',
        type: 'string',
        tableKey: 'course_code',
    },
    {
        jsonKey: 'name_sv',
        type: 'string',
        tableKey: 'course_name_sv',
    },
    {
        jsonKey: 'name_en',
        type: 'string',
        tableKey: 'course_name_en',
    },
    {
        jsonKey: 'credits',
        type: 'number',
        tableKey: 'credits',
    },
    {
        jsonKey: 'cycle',
        type: 'string',
        tableKey: 'level',
    },
];

const PROGRAMME_COURSE_TABLE = 'programme_courses';
const keyMapProgrammeCourse = [
    {
        jsonKey: 'programmeCode',
        type: 'string',
        tableKey: 'programme_code',
    },
    {
        jsonKey: 'courseCode',
        type: 'string',
        tableKey: 'course_code',
    },
];

const COURSE_PERIODS_TABLE = 'course_period';
const keyMapCoursePeriods = [
    {
        jsonKey: 'courseCode',
        type: 'string',
        tableKey: 'course_code',
    },
    {
        jsonKey: 'periodStart',
        type: 'number',
        tableKey: 'period_start',
    },
    {
        jsonKey: 'periodEnd',
        type: 'number',
        tableKey: 'period_end',
    },
];

const PROGRAMMES_TABLE = 'programmes';
const keyMapProgrammes = [
    {
        jsonKey: 'programmeCode',
        type: 'string',
        tableKey: 'programme_code',
    },
    {
        jsonKey: 'programme_sv',
        type: 'string',
        tableKey: 'programme_name_sv',
    },
    {
        jsonKey: 'programme_en',
        type: 'string',
        tableKey: 'programme_name_en',
    },
];

const COURSE_MASTER_TABLE = 'masters';
const keyMapCourseMaster = [
    {
        jsonKey: 'specialisationCode',
        type: 'string',
        tableKey: 'master_code',
    },
    {
        jsonKey: 'specialisation_sv',
        type: 'string',
        tableKey: 'master_name_sv',
    },
    {
        jsonKey: 'specialisation_en',
        type: 'string',
        tableKey: 'master_name_en',
    },
];

const PROGRAMME_MASTERS_TABLE = 'programme_masters';
const keyMapProgrammeMasters = [
    {
        jsonKey: 'programmeCode',
        type: 'string',
        tableKey: 'programme_code',
    },
    {
        jsonKey: 'specialisationCode',
        type: 'string',
        tableKey: 'master_code',
    },
];

const MASTER_COURSES_TABLE = 'masters_courses';
const keyMapMasterCourses = [
    {
        jsonKey: 'specialisationCode',
        type: 'string',
        tableKey: 'master_code',
    },
    {
        jsonKey: 'courseCode',
        type: 'string',
        tableKey: 'course_code',
    },
];

/**
 * Simple hashmap to store all the mappings
 * between table names and their respective keys
 * in course json file
 * @deprecated
*/
const SimpleHashMap = new Map()
    .set(COURSES_INFO_TABLE, keyMapCoursesInfo)
    .set(PROGRAMME_COURSE_TABLE, keyMapProgrammeCourse)
    .set(COURSE_PERIODS_TABLE, keyMapCoursePeriods)
    .set(PROGRAMMES_TABLE, keyMapProgrammes)
    .set(COURSE_MASTER_TABLE, keyMapCourseMaster)
    .set(PROGRAMME_MASTERS_TABLE, keyMapProgrammeMasters)
    .set(MASTER_COURSES_TABLE, keyMapMasterCourses);

/*
const keyMap = getKeyMapfromSQLTable(TABLE).then((res) => {
    console.log(res);
    const x = mapPropToType(TABLE, res);
    return x;
}).then(console.log);

*/
const DB_TABLES = Array.from(SimpleHashMap.keys());

const generalQuestions = [
    {
        type: 'checkbox',
        name: 'db',
        message: 'Which Databases would you like to update?',
        choices: DB_TABLES,
    },
];

// Self invoking async function, i.e run this function immediately
// when the script is run
(async () => {
    const { db } = await inquirer.prompt(generalQuestions);
    db.forEach(async (tableName) => {
        const keyMappings = await getKeyMapfromSQLTable(tableName);
        const jsonKeys = await mapPropToType(tableName, keyMappings);
        genSqlStmt({ jsonKeys, tableName });
    });
})();
