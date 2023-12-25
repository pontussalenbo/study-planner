import * as fs from 'fs';
import * as path from 'path';

import {
	CourseDataWithClass,
	CourseDataWithPeriods,
	Period,
	TimePlan,
} from './API';
import m from '../all.json';
import { DB_TABLES, FILE_PATHS } from './utils/constants';

type Column = keyof CourseDataWithPeriods;
type ColumnType = Record<string, string>;
type PeriodKey = keyof Period;

const defaultCourseDir = 'courses.json';
const mappings = m as Record<string, Column>;
const ENCODING = 'utf8';
const DEGREE_PROJECT_PERIODS = [{ periodStart: 1, periodEnd: 2 }, { periodStart: 3, periodEnd: 4 }];

const readCourseData = (
	courseDir: string = defaultCourseDir
): CourseDataWithClass[] =>
	JSON.parse(fs.readFileSync(path.join(__dirname, courseDir), { encoding: ENCODING }));


/**
 * Parses time plans to find periods for a course.
 *
 * LTH API returns time plans for a course, where each object in the timePlans array
 * represents which study period(s) the course is being taught.
 *
 * @param timePlans array of objects representing time plans for a course (the index of the object
 * represents the study period in which the course is being taught).
 * @returns Array of period objects for a course.
 */
function findCoursePeriods(timePlans: TimePlan[]) {
	/* The course is a degree project, thus can be conducted at any time between two periods */
	if (timePlans[0].studyPeriods.every(timePlan => timePlan === null)) {
		return DEGREE_PROJECT_PERIODS;
	}

	return timePlans.map(timePlan => {
		const periods = timePlan.studyPeriods
			.map((period, idx) => (period !== null ? idx + 1 : 0))
			.filter(period => period !== 0);

		/* If the course is not being taught in any period,
		return 0 for both periodStart and periodEnd
		if (periods.length === 0) {
			return { periodStart: 0, periodEnd: 0 };
		}
		*/

		const periodStart = Math.min(...periods);
		const periodEnd = Math.max(...periods);

		return { periodStart, periodEnd };
	});
}

/**
 * Add periods array to course data in order to generate SQL insert statements.
 * @param data course data from LTH API
 * @returns original course data with periods array
 */
function parse(data: CourseDataWithClass[]): CourseDataWithPeriods[] {
	return data.map(course => {
		const periods = findCoursePeriods(course.timePlans);
		return { ...course, periods };
	});
}

// Helper to get SQL schema from file.
const sqlSchema = (table: string) => {
	const filepath = path.join(
		__dirname,
		`${FILE_PATHS.DB_TABLES}/${table}.sql`
	);
	return fs.readFileSync(filepath, { encoding: ENCODING });
};

/**
 * Extracts columns from SQL schema.
 * @param schema SQL schema as string
 * @returns Record with column names as keys and column types as values
 */
const extractColumnsFromSchema = (schema: string) => {
	const columnRegex: RegExp = /\b(\w+)\b\s+(\w+)/g;
	const excludedKeywords =
		/(PRAGMA|IF|DROP TABLE|PRIMARY KEY|FOREIGN KEY|REFERENCES|CREATE TABLE|NOT NULL)/;
	const columns: Record<string, string> = {};
	let match: RegExpExecArray | null;

	while ((match = columnRegex.exec(schema)) !== null) {
		const [_, columnName, columnType] = match;
		const line = `${columnName} ${columnType}`.trim();
		const isKeyword = excludedKeywords.test(line);
		if (!isKeyword) {
			columns[columnName] = columnType;
		}
	}
	return columns;
};

/**
 * Extracts primary key from SQL schema.
 * @param schema SQL schema as string
 * @returns primary key(s) as an array of stringss
 */
function getPrimaryKeys(primaryKeyString: string) {
	const regex = /PRIMARY KEY\s*\(([^)]+)\)/i;
	const match = primaryKeyString.match(regex);

	if (match?.[1]) {
		// split by comma, trim whitespace, and return the result array
		return match[1].split(',').map((key: string) => key.trim());
	} else {
		return [];
	}
}

/**
 * Generates SQL insert statements from course data.
 * @param schema SQL schema as string
 * @param table name of table
 * @param columns columns to be included in insert statement
 * @returns SQL insert statement as string
 */
const createSqlInsertStatement = (
	schema: string,
	table: string,
	columns: Array<Column>
): string => {
	let sqlInsert = `${schema}\nINSERT OR REPLACE INTO ${table}(`;
	sqlInsert += columns.join(', ') + ') VALUES\n';
	return sqlInsert;
};

/**
 * Generates SQL insert statements from course data based on SQL schema and needed columns.
 * @param course parsed course data from LTH API
 * @param period period object for course
 * @param columns columns to be included in insert statement
 * @param colTypes column type mappings
 * @returns SQL row insert statement as string
 */
const generateRow = (
	course: CourseDataWithPeriods,
	period: Period,
	columns: Column[],
	colTypes: ColumnType
) => {
	const value = columns.map(col => {
		const type = colTypes[col];
		const mappedCol = mappings[col];
		const value = course[mappedCol] || period[mappedCol as PeriodKey];

		if (value === undefined) {
			throw new Error(
				`[${course.courseCode} - ${course.class}]: Value for column ${col} is undefined`
			);
		}

		return type === 'TEXT' || type === 'VARCHAR' ? `'${value}'` : value;
	});

	return value.join(', ');
};

/**
 * Creates rows with values for SQL insert statement.
 * @param courses coursedata to be inserted
 * @param colTypes column type mappings
 * @param columns columns to be included in insert statement
 * @param pk primary key(s) of table
 * @returns SQL value rows insert statement as string
 */
const createValuesForInsert = (
	courses: CourseDataWithPeriods[],
	colTypes: ColumnType,
	columns: Column[],
	pk: string[]
) => {
	let insertValues = '';
	const uniqueKeys = new Set<string>();

	courses.forEach(course => {
		const uniqueKey = pk.map(key => course[mappings[key]]).join('-');

		if (uniqueKeys.has(uniqueKey)) {
			return;
		}
		uniqueKeys.add(uniqueKey);
		const row = course.periods.map(
			period => `(${generateRow(course, period, columns, colTypes)}),\n`
		);
		insertValues += row.join('');
	});

	return insertValues;
};

/**
 * Generates SQL table creation with insert statements from course data
 * Wbased on SQL schema and needed columns for the table.
 * @param schema SQL schema as string
 * @param data parsed course data from LTH API
 * @param colTypes column type mappings
 * @param tableName name of table
 * @returns SQL table creation and insert statement as string
 */
const generateSqlInserts = (
	schema: string,
	data: CourseDataWithPeriods[],
	colTypes: ColumnType,
	tableName: string
) => {
	const columns = Object.keys(colTypes) as Column[];
	const pk = getPrimaryKeys(schema);

	let sqlInsert = createSqlInsertStatement(schema, tableName, columns);
	sqlInsert += createValuesForInsert(data, colTypes, columns, pk);

	sqlInsert = sqlInsert.slice(0, -2) + ';';

	return sqlInsert;
};

/**
 * Writes SQL insert statements to file.
 * @param sqlInserts string with SQL insert statements
 * @param table name of table
 */
const output = (sqlInserts: string, table: string) => {
	try {
		console.log(
			`Writing to file for table: ${FILE_PATHS.DB_DATA_OUT_DIR}`
		);
		const filepath = `${FILE_PATHS.DB_DATA_OUT_DIR}/${table}.sql`;
		console.log(`Writing to file: ${filepath}`);

		fs.promises.mkdir(`${FILE_PATHS.DB_DATA_OUT_DIR}`, { recursive: true });
		// Write to file
		fs.promises.writeFile(
			`${FILE_PATHS.DB_DATA_OUT_DIR}/${table}.sql`,
			sqlInserts,
			{ encoding: ENCODING }
		);
	} catch (err) {
		console.error('Error writing to file for table: ' + table + '\n');
		console.error(err);
	}
};

/**
 * Generates SQL insert statements from course data for a specific table.
 * @param table name of table to generate SQL insert statements for
 */
export function generateSQLData(table: string) {
	const courseData = readCourseData();
	const schema = sqlSchema(table);
	const data = parse(courseData);
	const columns = extractColumnsFromSchema(schema);
	const sqlInserts = generateSqlInserts(schema, data, columns, table);

	output(sqlInserts, table);
}

/**
 * Generates SQL insert statements from course data for all tables
 * defined in the `DB_TABLES` constant.
 */
export function generateSQLDataAllTables() {
	DB_TABLES.forEach(table => {
		generateSQLData(table);
	});
}
