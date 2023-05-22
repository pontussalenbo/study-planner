import fs from 'fs';
import { CourseData, CourseDataWithClass, CourseDataWithPeriods, TimePlan } from "./API";
import m from '../db/tables/mappings/all.json';
import { FILE_PATHS } from './utils/constants';

const courseDir = "./scripts/courses.json";
const mappings = m as Record<string, keyof CourseData>;
const courseData: CourseDataWithClass[] = JSON.parse(fs.readFileSync(courseDir, 'utf-8'));


function findCoursePeriods(timePlans: TimePlan[]) {
    return timePlans.map((timePlan) => {
        const periods = timePlan.studyPeriods
            .map((period, idx) => (period !== null ? idx + 1 : 0))
            .filter((period) => period !== 0);

        if (periods.length === 0) {
            return { periodStart: 0, periodEnd: 0 };
        }

        const periodStart = Math.min(...periods);
        const periodEnd = Math.max(...periods);

        return { periodStart, periodEnd };
    });
}
/*
function parse(data: CourseData[]): CourseDataWithPeriods[] {
    return data.map((course) => {
        const destructuredProps: CourseDataWithPeriods = {} as CourseDataWithPeriods;

        ({
            courseCode: destructuredProps.courseCode,
            timePlans: destructuredProps.timePlans,
            academicYearId: destructuredProps.academicYearId,
            name_en: destructuredProps.name_en,
            name_sv: destructuredProps.name_sv,
            credits: destructuredProps.credits,
            cycle: destructuredProps.cycle,
            specialisationCode: destructuredProps.specialisationCode,
            specialisation_en: destructuredProps.specialisation_en,
            specialisation_sv: destructuredProps.specialisation_sv,
            programmeCode: destructuredProps.programmeCode,
            choice: destructuredProps.choice,
            programme_en: destructuredProps.programme_en,
            programme_sv: destructuredProps.programme_sv,
            class: destructuredProps.class,
        } = course);


        const periods = findCoursePeriods(destructuredProps.timePlans);
        return { ...destructuredProps, periods };
    });
}
*/

function parse(data: CourseDataWithClass[]): CourseDataWithPeriods[] {
    return data.map((course) => {
        const periods = findCoursePeriods(course.timePlans);
        return { ...course, periods };
    });
}



const sqlSchema = (table: string) => fs.readFileSync(`${FILE_PATHS.DB_TABLES}/${table}.sql`, 'utf8');

const extractColumnsFromSchema = (schema: string) => {
    const columnRegex: RegExp = /\b(\w+)\b\s+(\w+)/g;
    const excludedKeywords = /(PRAGMA|IF|DROP TABLE|PRIMARY KEY|FOREIGN KEY|REFERENCES|CREATE TABLE|NOT NULL)/;
    const columns: Record<string, string> = {};
    let match: RegExpExecArray | null;

    while ((match = columnRegex.exec(schema)) !== null) {
        const columnName: string = match[1];
        const columnType: string = match[2];
        const line = (columnName + " " + columnType).trim();
        const bool = excludedKeywords.test(line);
        if (!bool) {
            columns[columnName] = columnType;
        }
    }

    return columns;
};

const generateSqlInserts = (schema: string, data: CourseDataWithPeriods[], columns: Record<string, string>) => {
    const cols = Object.keys(columns) as Array<keyof CourseData>;
    let sqlInsert = `${schema}\nINSERT OR REPLACE INTO course_period_year (`;
    sqlInsert += cols.join(', ') + ') VALUES\n';

    data.forEach((course) => {

        course.periods.forEach((period) => {
            const values = cols.map((col) => {
                const type = columns[col];
                const mappedCol = mappings[col];
                const value = course[mappedCol] || period[mappedCol as keyof typeof period];

                if (value === undefined) {
                    throw new Error(`[${course.courseCode} - ${course.class}]: Value for column ${col} is undefined`);
                }

                return type === 'TEXT' || type === 'VARCHAR' ? `'${value}'` : value;
            });
            sqlInsert += `(${values.join(', ')}),\n`;
        });
    });

    sqlInsert = sqlInsert.slice(0, -2) + ';';

    return sqlInsert;
};


export function generateSQLData(table: string) {
    const schema = sqlSchema(table);
    const data = parse(courseData);
    const columns = extractColumnsFromSchema(schema);
    const sqlInserts = generateSqlInserts(schema, data, columns);
    fs.promises.mkdir(`${FILE_PATHS.DB_DATA_OUT_DIR}`, { recursive: true });
    // Write to file
    fs.promises.writeFile(`${FILE_PATHS.DB_DATA_OUT_DIR}/${table}.sql`, sqlInserts, 'utf8');
}
