/* eslint-disable no-shadow */
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';
import { CourseData } from './API';

interface Query {
	programmeCode: string;
	kull: string;
}

const programmeCode = [
	'B',
	'C',
	'D',
	'E',
	'F',
	'M',
	'MD',
	'I',
	'K',
	'L',
	'N',
	'Pi',
	'V',
	'W',
];
const classes = [
	'H10',
	'H11',
	'H12',
	'H13',
	'H14',
	'H15',
	'H16',
	'H17',
	'H18',
	'H19',
	'H20',
];
const delayBetweenRequests = 500;

async function getCourses(queryObj: Partial<Query>) {
	const queryParams = Object.keys(queryObj) as Array<keyof Query>;
	const queries = queryParams.map(key => `${key}=${queryObj[key]}`).join('&');
	const url = `https://api.lth.lu.se/lot/courses?${queries}}`;
	const resp = await axios.get<CourseData[]>(url);
	return resp.data;
}

const fetchCourseData = async (programmeCode: string, kull: string) => {
	console.log(
		`Retrieving course data for programme: ${programmeCode} and class: ${kull}...`
	);

	try {
		const courses = await getCourses({ programmeCode, kull });

		return courses.map(course => ({
			...course,
			class: kull,
		}));
	} catch (error) {
		console.error(
			`Error retrieving course data for programme: ${programmeCode} and class: ${kull}`,
			error
		);
		return [];
	}
};

const fetchByClass = async (programme: string, clazz: string) =>
	new Promise((resolve, reject) => {
		const intervalId = setTimeout(async () => {
			try {
				const coursesWithClass = await fetchCourseData(
					programme,
					clazz
				);
				resolve(coursesWithClass);
			} catch (error) {
				reject(error);
			} finally {
				clearInterval(intervalId);
			}
		}, delayBetweenRequests);
	});

const getCoursesByProgramme = (programme: string) =>
	classes.map(kull => fetchByClass(programme, kull));

export async function main(filePath: string = __dirname) {
	const fetchPromises = programmeCode.flatMap(programme =>
		getCoursesByProgramme(programme)
	);

	const courseDataArray = await Promise.all(fetchPromises);
	const coursesWithClass = courseDataArray.flat();

	console.log(
		`Retrieved course data for ${coursesWithClass.length} courses.`
	);

	const json = JSON.stringify(coursesWithClass);
	await fs.promises.writeFile(path.join(filePath, 'courses.json'), json);
};

if (process.argv[2] === '--run') {
	main();
}

/*
if (require.main === module) {
	main();
}
*/