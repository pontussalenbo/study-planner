import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Table from './components/Table';
import useFetch from './hooks/useFetch';

import programmes from './data/programmes.json';
import courses from './data/courses.json';

const App = () => {
	const [programmeCourses, setProgrammeCourses] = useState<any[]>([]);
	useEffect(() => {
		const coursesFilter = courses.filter(
			course => course.specialisationCode === 'pv'
		);
		setProgrammeCourses(coursesFilter);
	}, []);

	return <Table props={programmeCourses} />;
};
export default App;
