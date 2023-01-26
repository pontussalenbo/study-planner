const fs = require("fs");
const courses = require("../data/courses.json");

let SQLStmt = "INSERT OR REPLACE";

function genSqlStmt({ jsonKeys, tableName, tableKeys }) {
    SQLStmt += `\nINTO ${tableName}(${tableKeys})\nVALUES`;
    courses.map((course) => {
        SQLStmt += `\n      (`;
        jsonKeys.map((key) => {
            SQLStmt += `"${course[key]}", `;
        })
        SQLStmt = SQLStmt.slice(0, -2);
        SQLStmt += `),`;
    })

    fs.writeFile("courses.sql", SQLStmt, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

genSqlStmt({jsonKeys: ["courseCode", "name_en", "credits", "cycle"], tableName: "courses", tableKeys: "course_code, course_name, credits, level" })

function genCourses() {
    SQLStmt += `\nINTO courses(course_code, course_name, credits, level)\nVALUES`;
    courses.map((course) => {
        const { courseCode, name_en, credits, cycle } = course;
        SQLStmt += `\n      ("${courseCode}", "${name_en}", "${credits}", "${cycle}"),`;
    })

    fs.writeFile("courses.sql", SQLStmt, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

// genCourses();