/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/* eslint-disable no-shadow */
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { CourseData } from './API';

interface Query {
	programmeCode: string;
	kull: string;
}

// All programme codes to fetch courses for.
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

// All classes to fetch courses for.
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

// Time to wait between requests to the LTH API.
const delayBetweenRequests = 500;
const LTH_API_URL = 'https://api.lth.lu.se/lot/courses';
/**
 * Fetches course data from the LTH API for a given programme and class.
 * @param queryObj query parameters for the LTH API.
 * @returns an array of course data.
 */
async function getCourses(queryObj: Partial<Query>) {
	const queryParams = Object.entries(queryObj)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');

	const url = `${LTH_API_URL}?${queryParams}}`;

	const resp = await axios.get<CourseData[]>(url);

	return resp.data;
}

/**
 * Fetches course data for a given programme and class.
 * Helper function for {@linkcode fetchByClass}.
 *
 * @param programmeCode the programme code.
 * @param kull the class to fetch courses for (e.g H19).
 * @returns an array of course data.
*/
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

/**
 * Fetches course data for a given programme and class.
 *
 * Wrapper for {@linkcode fetchCourseData} which waits a given amount of time
 * between requests to avoid overloading the LTH API.
 *
 * @param programme the programme code.
 * @param clazz the class to fetch courses for (e.g H19).
 * @returns an promise which resolves to an array of course data.
 */
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

/**
 * Gets course data for all classes in a given programme.
 * @param programme the programme code.
 * @returns an array of promises which resolve to course data.
 */
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
	const fullPath = path.join(filePath, 'courses.json');
	console.log(`Writing to ${fullPath}`);

	await fs.promises.writeFile(fullPath, json);
};

// Run the script if it is called directly. (i.e not imported, but invoked by `node getCourse.ts`)
if (require.main === module) {
	main();
}
