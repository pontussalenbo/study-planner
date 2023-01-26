import React, { useState } from 'react';

import useTable from '../../hooks/useTable';
import type { CourseData } from '../../interfaces/CourseData';
import Pagination from '../Pagination';
import styles from './Table.module.css';

interface ITableProps<T> {
	headers: string[];
	data: T[];
	dataProps: string[];
	rowsPerPage: number;
	addCourse: (course: CourseData) => void;
	usePagination?: boolean;
}
/*
"timePlans": [
	{
	  "startSpNr": 99,
	  "endSpNr": 99,
	  "studyPeriods": [
		null,
		null,
		null,
		{
		  "lecture": 32,
		  "exercise": 4,
		  "laborations": 6,
		  "project": 0,
		  "selfStudies": 78
		}
	  ]
	}
  ]
  */

/**
 * Gets the domain of the periods for a course, i.e start and end period
 * @param course
 * @returns
 */
const getPeriodsForCourse = (course: Course.CourseData) => {
	const periods = course.timePlans[0].studyPeriods
		.map((period, idx) => (period !== null ? idx + 1 : 0))
		.filter(_ => !!_);

	const dom = [Math.min(...periods), Math.max(...periods) + 1];
	return dom;
};

const getCourseData = (course: Course.CourseData) => {
	const periods = getPeriodsForCourse(course);
	const data = {
		courseCode: course.courseCode,
		credits: Number.parseInt(course.credits, 10),
		cycle: course.cycle,
		name_en: course.name_en,
		periods
	};
	return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <T extends Record<any, any>>({
	headers,
	data,
	dataProps,
	rowsPerPage,
	addCourse,
	usePagination = false
}: ITableProps<T>) => {
	const [page, setPage] = useState(1);

	const { slice } = useTable(data, page, rowsPerPage);

	return (
		<>
			<table className={styles.table}>
				<thead className={styles.tableRowHeader}>
					<tr>
						{headers.map(header => (
							<th key={header} className={styles.tableHeader}>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{slice.map(el => (
						<tr
							className={styles.tableRowItems}
							key={el.courseCode as string}
						>
							{dataProps.map(prop => (
								<td className={styles.tableCell}>
									{el[prop] as string}
								</td>
							))}
							<td className={styles.tableCell}>
								<button
									onClick={() =>
										addCourse(
											getCourseData(
												el as unknown as Course.CourseData
											)
										)
									}
									className={styles.addButton}
								>
									+
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{usePagination ? (
				<Pagination
					currentPage={page}
					totalCount={data.length}
					pageSize={7}
					onPageChange={page => setPage(page)}
				/>
			) : null}
		</>
	);
};

export default Table;
