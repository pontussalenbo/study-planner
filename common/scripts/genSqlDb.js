const fs = require("fs").promises;
const courses = require("../data/courses.json");
/**
 * Generate array of unique entries by given key
 * @param {array} arr array to remove duplicates entries from
 * @param {*} key key to use for comparison when filtering duplicates
 * @returns array of unique entries
 */
function getUniqueListBy(arr, key) {
    // Generate 2d array holding key value pairs
    const MapItems = arr.map(item => [item[key], item]);
    // Create a map from the 2d array
    const map = new Map(MapItems);
    // Spread the map into an array and return it
    return [...map.values()]
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
		.filter(_ => !!_);
        const periodStart = Math.min(...periods);
        const periodEnd = Math.max(...periods);
   
        return { periodStart, periodEnd };
    })
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
const SQL_KEYWORDS = ["PRIMARY", "FOREIGN", "REFERENCES", "NOT NULL", "UNIQUE"]

/**
 * Reads the SQL table definition from .sql file and returns it as a string.
 * Useful for getting the table keys and types.
 * @param {string} table name of the table .
 * @returns string representation of the table definition, i.e the keys and types.
 */
async function getKeyMapfromSQLTable(table) {
    try {
        const data = await fs.readFile(`../db/tables/${table}.sql`, "utf8");
        // Advanced regex to get the string between (...);
        const regex =/(?<=(\()).*?(?=(\)\;))/s;
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
.set("VARCHAR", "string")
.set("CHAR", "string")
.set("INT", "number")
.set("TEXT", "string")
.set("REAL", "number")
.set("DOUBLE", "number");

/**
 * 
 * @param {*} tableName 
 * @param {*} table 
 * @returns 
 */
async function mapPropToType(tableName, table) {
    // Get the mappings from the json file, i.e which json key corresponds to which sql key
    const mappingsString = await getTableMappings(tableName);
    const mappings = JSON.parse(mappingsString);
    // remove newlines and split on comma, to get an array of strings that contains table keys and types
    const tableStr = table.replace(/(\r\n|\n|\r)/gm, "").split(",")
    return tableStr.map((prop) => {
        // Remove beatiful whitespace
        const line = prop.trim();
        // Get the key and type from the string
        const [key, type] = line.split(" ");
        // If the key is a SQL keyword, we dont want to include it in our json
        if(SQL_KEYWORDS.includes(key)) {
            return;
        }
        // Get the type from the string BEFORE the length is defined
        const typeRegex = /^[^\(]*/;
        const [ jsontype ] = typeRegex.exec(type);
        return {
            tableKey: key,
            type: SqlToJsonType.get(jsontype),
            jsonKey: mappings[key]
        }
    }).filter(_ => !!_);
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
        else {
            return `("${courseCode}", ${periodStart}, ${periodEnd}`;
        }
    });
    // Join the array and add a parenthesis to the end of each substring
    return stmts.join("),\n      ");
}

/**
 * Reads the SQL table from file and returns it as a string
 * @param {string} tableName name of the table definition
 * @returns string representation of the table
 */
async function getSQLTable(tableName) {
    return fs.readFile("../db/tables/" + tableName + ".sql", "utf8");
}

/**
 * Reads the sql table column to json key mappings from file and returns it as a string
 * @param {string} table name of the table
 * @returns string representation of the table mappings
 */
async function getTableMappings(table) {
    return fs.readFile("../db/tables/" + table + "_mappings.json", "utf8");
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
    let SQLStmt = table + "\nBEGIN TRANSACTION;\n\nINSERT OR REPLACE";

    console.log(`Generating ${tableName}...`)

    try {
        // Get all table columns as a comma separated string
        const tableKeys = jsonKeys.map((key) => key.tableKey).join(", ");

        SQLStmt += `\nINTO ${tableName}(${tableKeys})\nVALUES`;

        const uniqueCourses = getUniqueListBy(courses, "courseCode");
        uniqueCourses.map((course) => {
        // Begin the row value statement
        SQLStmt += `\n      (`;

        jsonKeys.map((key) => {
            const { jsonKey, type } = key;
            // Early return as period start will handle logic for period start and end, 
            // since it is one row in our sql table
            if (jsonKey === "periodEnd") {
                return;
            }
            /**
             * Special treatment for period start, since it is a special case
             * where we need to create multiple rows for each period a course has
             */
            if (jsonKey === "periodStart") {
                const stmt = getCoursePeriodSQLStmt(course);
                SQLStmt += `${stmt}) `;
                return;
            } 
            // If the type is a string, we need to add quotes around the value
            else {
                const stmt = type === "string" ? `'${course[jsonKey]}'` : course[jsonKey];
                SQLStmt += `${stmt}, `;
            }

        });
            // Evil hack to remove the last comma
            SQLStmt = SQLStmt.slice(0, -2);
            // End the row value statement
            SQLStmt += `),`;
        });
        // Remove last comma to prevent syntax error
        const data = SQLStmt.slice(0,-1);
        // Write to file
        await fs.writeFile(`../db/data/${tableName}.sql`, data, "utf8");
    } catch (error) {
        console.log(error);
    }

}

/**
 * ALL MAPPINGS FOR TABLES AND KEYS ARE DEFINED HERE
 */
const COURSES_INFO_TABLE = "courses_info";
const keyMapCoursesInfo = [
  {
    jsonKey: "courseCode",
    type: "string",
    tableKey: "course_code",
  },
  {
    jsonKey: "name_sv",
    type: "string",
    tableKey: "course_name_sv",
  },
  {
    jsonKey: "name_en",
    type: "string",
    tableKey: "course_name_en",
  },
  {
    jsonKey: "credits",
    type: "number",
    tableKey: "credits",
  },
  {
    jsonKey: "cycle",
    type: "string",
    tableKey: "level",
  },
];

const PROGRAMME_COURSE_TABLE = "programme_course"
const keyMapProgrammeCourse = [
    {
        jsonKey: "programmeCode",
        type: "string",
        tableKey: "programme_code",
    },
    {
        jsonKey: "courseCode",
        type: "string",
        tableKey: "course_code",
    },
];

const COURSE_PERIODS_TABLE = "course_period";
const keyMapCoursePeriods = [
    {
        jsonKey: "courseCode",
        type: "string",
        tableKey: "course_code"
    },
    {
        jsonKey: "periodStart",
        type: "number",
        tableKey: "period_start"
    },
    {
        jsonKey: "periodEnd",
        type: "number",
        tableKey: "period_end"
    },
]

const PROGRAMMES_TABLE = "programmes";
const keyMapProgrammes = [
    {
        jsonKey: "programmeCode",
        type: "string",
        tableKey: "programme_code",
    },
    {
        jsonKey: "programme_sv",
        type: "string",
        tableKey: "programme_name_sv",
    },
    {
        jsonKey: "programme_en",
        type: "string",
        tableKey: "programme_name_en",
    }
]

const COURSE_MASTER_TABLE = "masters";
const keyMapCourseMaster = [
    {
        jsonKey: "specialisationCode",
        type: "string",
        tableKey: "master_code"
    },
    {
        jsonKey: "specialisation_sv",
        type: "string",
        tableKey: "master_name_sv"
    },
    {
        jsonKey: "specialisation_en",
        type: "string",
        tableKey: "master_name_en"
    }   
]

const PROGRAMME_MASTERS_TABLE = "programme_masters";
const keyMapProgrammeMasters = [
    {
        jsonKey: "programmeCode",
        type: "string",
        tableKey: "programme_code"
    },
    {
        jsonKey: "specialisationCode",
        type: "string",
        tableKey: "master_code"
    }
]

const MASTER_COURSES_TABLE = "master_courses";
const keyMapMasterCourses = [
    {
        jsonKey: "specialisationCode",
        type: "string",
        tableKey: "master_code"
    },
    {
        jsonKey: "courseCode",
        type: "string",
        tableKey: "course_code"
    }
]

/**
 * Simple hashmap to store all the mappings
 * between table names and their respective keys
 * in course json file
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
console.time("genSqlDb");
SimpleHashMap.forEach((value, key) => {
    genSqlStmt({ jsonKeys: value, tableName: key });
});
console.timeEnd("genSqlDb");
*/

// genSqlStmt({ jsonKeys: keyMapCoursesInfo, tableName: COURSES_INFO_TABLE });

const TABLE = "courses_info";

const keyMap = getKeyMapfromSQLTable(TABLE).then((res) => {
    console.log(res);
    const x = mapPropToType(TABLE,res)
    return x;
}).then(console.log);

// Self invoking async function, i.e run this function immediately
// when the script is run
(async() => {
    const tables = Array.from(SimpleHashMap.keys());
    ["courses_info"].forEach(async (table) => {
        const keyMap = await getKeyMapfromSQLTable(table);
        const x = await mapPropToType(table, keyMap);
        console.log(x)
        genSqlStmt({ jsonKeys: x, tableName: table });
    });
})();

// Generate Array of objects with key and value from Map data structure
const mapToArray = (map) =>  Array.from(map, ([name, value]) => ({ name, value }));




