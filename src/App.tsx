import { useEffect, useState } from 'react';
import styles from './App.module.css';
import HorizontalBarChart from './components/HorizontalBarChart';
import Table from './components/Table/Table';

import courses from './data/courses.json';
import type { CourseData } from './interfaces/CourseData';

function getUniqueListBy(
	arr: Course.CourseData[],
	key: keyof Course.CourseData
) {
	return [...new Map(arr.map(item => [item[key], item])).values()];
}

const INIT_STATE = [
	{ name: 'EDAN40', periods: [1, 2] },
	{ name: 'ETSN01', periods: [1, 2] },
	{ name: 'EDAA01', periods: [2, 3] },
	{ name: 'EDAF50', periods: [3, 4] },
	{ name: 'EITF35', periods: [4, 5] }
];

const App = () => {
	const [programmeCourses, setProgrammeCourses] = useState<
		Course.CourseData[]
	>([]);

	const [selectedCourses, setSelectedCourses] =
		useState<CourseData[]>(INIT_STATE);

	const headers = ['Course Code', 'Credits', 'Level', 'Course Name', 'Add'];
	const contents = ['courseCode', 'credits', 'cycle', 'name_en'];

	const onClickAddCourse = (course: CourseData) => {
		setSelectedCourses([...selectedCourses, course]);
	};

	useEffect(() => {
		// TODO: fix type error?
		const coursesFilter = getUniqueListBy(courses, 'courseCode');
		setProgrammeCourses(coursesFilter);
	}, []);

	return (
		<main className={styles.container}>
			<div className={styles.wrapper}>
				<Table<Course.CourseData>
					headers={headers}
					addCourse={onClickAddCourse}
					dataProps={contents}
					data={programmeCourses}
					rowsPerPage={7}
					usePagination
				/>
				<HorizontalBarChart courses={selectedCourses} />
			</div>
		</main>
	);
};
export default App;
