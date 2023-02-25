const fs = require('fs').promises;
const path = require('path');

const { FILE_PATHS } = require('./utils/constants');
const courses = require('../data/courses_new.json');

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
        const data = await readFile(`${FILE_PATHS.DB_TABLES}/${table}.sql`, 'utf8');
        // Advanced regex to get the string between (...);
        const regex = /(?<=(\()).*?(?=(\);))/s;
        const [match] = regex.exec(data);
        return match.trim();
    } catch (error) {
        /** Something went wrong :( */
        return console.log(error);
    }
}

/**
 * Reads the sql table column to json key mappings from file and returns it as a string
 * @param {string} table name of the table
 * @returns string representation of the table mappings
 */
async function getTableMappings(table) {
    return readFile(`${FILE_PATHS.DB_TABLES_MAPPINGS}/${table}_mappings.json`, 'utf8');
}

/**
 * This function is used to parse a row in an SQL table definition file
 * to get its column-name, JSON type and correspondig json key in course data.
 *
 * @param line - a column line in the SQL table definition.
 * @returns {{tableKey: string, type: string, jsonKey: *}}
 * an object containing the column name, its type and the corresponding JSON key in course data.
 */
function getColType(line, jsonMappings) {
    /**
     * Remove commas as they only separate each column and type
     * Split the string on whitespace to get the columns and corresponding type
     */
    const [col, type] = line.replace(',', '').split(' ');
    // Get the type from the string BEFORE the length is defined, e.g VARCHAR(255) -> VARCHAR
    const typeRegex = /^[^\\(]*/;
    const [jsontype] = typeRegex.exec(type);

    return {
        tableKey: col,
        type: SqlToJsonType.get(jsontype),
        jsonKey: jsonMappings[col],
    };
}

function mapTableCols(table, jsonMappings) {
    // Remove beautiful whitespace
    const line = table.trim();
    // If the key is a SQL keyword, we dont want to include it in our mappings
    const isKeyword = SQL_KEYWORDS.some((x) => line.startsWith(x));
    if (isKeyword) {
        return null;
    }
    return getColType(line, jsonMappings);
}

/**
 * @param {string} tableName - the name of the database table to map
 * @param {string} table - the contents of the database table to map
 * @returns {Promise<Array<{property:string, type:string}>>} - the array of mappings
 */
async function mapPropToType(tableName, table) {
    // get the mapping from the database
    const mappingsString = await getTableMappings(tableName);
    // parse the JSON string into an object
    const mappings = JSON.parse(mappingsString);

    // split the table string into an array of rows
    const tableStr = table.replace(/\n\s*\n/g, '\n').split(/\r?\n/);

    // map the table rows into an array of mappings
    return tableStr.reduce((memo, it) => {
        // see if we can map the row to a property
        const res = mapTableCols(it, mappings);
        // if we can, add it to the array
        if (res) {
            memo.push(res);
        }
        return memo;
    }, []);
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

        return `('${courseCode}', '${course.class}', '${course.academicYearId}', ${periodStart}, ${periodEnd}`;
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
    return readFile(`${FILE_PATHS.DB_TABLES}//${tableName}.sql`, 'utf8');
}

function parseKey(course, key) {
    // TODO: Make this function get each json key and its type
    const { jsonKey, type } = key;
    // Early return as period start will handle logic for period start and end,
    // since it is one row in our sql table
    if (jsonKey === 'periodEnd') {
        return '';
    }
    /**
     * Special treatment for period start, since it is a special case
     * where we need to create multiple rows for each period a course has
     */
    if (jsonKey === 'periodStart') {
        const str = getCoursePeriodSQLStmt(course);
        return `${str}) `;
    }
    // If the type is a string, we need to add quotes around the value
    const str = type === 'string' ? `'${course[jsonKey]}'` : course[jsonKey];
    return `${str}, `;
}

/**
 * This is where the magic happens
 * @param {object} param0 object holding json keyMappings and the table name
 * @returns void
 */
async function genSqlStmt({ mappings, tableName }) {
    // Read SQL table from file
    const table = await getSQLTable(tableName);
    // Add SQL syntax to the beginning of the file
    let SQLStmt = `${table}\n\nINSERT OR REPLACE`;

    console.log(`Generating ${tableName}...`);

    try {
        // Get all table columns as a comma separated string
        const tableKeys = mappings.map((key) => key.tableKey).join(', ');
        console.log(tableKeys);

        SQLStmt += `\nINTO ${tableName}(${tableKeys})\nVALUES`;

        // const uniqueCourses = getUniqueListBy(courses, 'courseCode');
        courses.forEach((course) => {
            // Begin the row value statement
            SQLStmt += '\n      (';

            mappings.forEach((key) => {
                SQLStmt += parseKey(course, key);
            });
            // Evil hack to remove the last comma
            SQLStmt = SQLStmt.slice(0, -2);
            // End the row value statement
            SQLStmt += '),';
        });
        // Remove last comma to prevent syntax error
        const data = SQLStmt.slice(0, -1);
        // create directory if it does not exist
        await fs.mkdir(`${FILE_PATHS.DB_DATA_OUT_DIR}`, { recursive: true });
        // Write to file
        await fs.writeFile(`${FILE_PATHS.DB_DATA_OUT_DIR}/${tableName}.sql`, data, 'utf8');
    } catch (error) {
        console.log(`Error generating ${tableName}`);
        console.log(error);
    }
}

// Generate Array of objects with key and value from Map data structure
const mapToArray = (map) => Array.from(map, ([name, value]) => ({ name, value }));

module.exports = {
    getKeyMapfromSQLTable,
    mapPropToType,
    genSqlStmt,
};

module.exports.default = module.exports;
