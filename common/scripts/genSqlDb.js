const fs = require("fs").promises;
const { time } = require("console");
const courses = require("../data/courses.json");

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

function findCoursePeriods(course) {
    return course.timePlans.map((timePlan) => {
        const periods = timePlan.studyPeriods.map((period, idx) => (period !== null ? idx + 1 : 0))
		.filter(_ => !!_);
        const periodStart = Math.min(...periods);
        const periodEnd = Math.max(...periods);
   
        return { periodStart, periodEnd };
    })
}


function findCourseIdx(courseCode) {
    return courses.findIndex((course) => course.courseCode === courseCode);
}

function getCoursePeriodSQLStmt(course) {
    const periods = findCoursePeriods(course);

    const { courseCode } = course; 

    const stmts = periods.map((period, idx) => {
        const { periodStart, periodEnd } = period;
        
        if (idx === 0) {
            return `${period.periodStart}, ${period.periodEnd}`;
        }
        else {
            return `("${courseCode}", ${periodStart}, ${periodEnd}`;
        }
    });
    return stmts.join("),\n      ");
}


async function genSqlStmt({ jsonKeys, tableName }) {
    let SQLStmt = "INSERT OR REPLACE";

    console.log(`Generating ${tableName}...`)

    try {
        const tableKeys = jsonKeys.map((key) => key.tableKey).join(", ");

        SQLStmt += `\nINTO ${tableName}(${tableKeys})\nVALUES`;
        getUniqueListBy(courses, "courseCode").map((course) => {
        SQLStmt += `\n      (`;
        
        const periods = findCoursePeriods(course);

        jsonKeys.map((key) => {
            const { jsonKey, type } = key;

            if(jsonKey === "periodEnd") {
                return;
            }

            if(jsonKey === "periodStart") {
                const stmt = getCoursePeriodSQLStmt(course);
                SQLStmt += `${stmt}) `;
                return;
            } else {
                const stmt = type === "string" ? `"${course[jsonKey]}"` : course[jsonKey];
                SQLStmt += `${stmt}, `;
            }

        });
            // Evil hack to remove the last comma
            SQLStmt = SQLStmt.slice(0, -2);
            SQLStmt += `),`;
        });
        await fs.writeFile(`../db/${tableName}.sql`, SQLStmt, "utf8");
    } catch (error) {
        console.log(error);
    }

}
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

const SimpleHashMap = new Map()
.set(COURSES_INFO_TABLE, keyMapCoursesInfo)
.set(PROGRAMME_COURSE_TABLE, keyMapProgrammeCourse)
.set(COURSE_PERIODS_TABLE, keyMapCoursePeriods)
.set(PROGRAMMES_TABLE, keyMapProgrammes)
.set(COURSE_MASTER_TABLE, keyMapCourseMaster)
.set(PROGRAMME_MASTERS_TABLE, keyMapProgrammeMasters)
.set(MASTER_COURSES_TABLE, keyMapMasterCourses);


console.time("genSqlDb");
SimpleHashMap.forEach((value, key) => {
    genSqlStmt({ jsonKeys: value, tableName: key });
});
console.timeEnd("genSqlDb");


// console.log(getCoursePeriodSQLStmt(courses[findCourseIdx("MIOA12")]));

const mapToArray = (map) =>  Array.from(map, ([name, value]) => ({ name, value }));




