// hooks/useFetchCourses.ts
import { useEffect, useState } from 'react';
import getUniqueListBy from 'utils/getUniqueList';
import type { CourseData } from 'views/MainPage';

interface Resp {
    courses: CourseData[];
}

export const useFetchCourses = (): CourseData[] => {
    const [courses, setCourses] = useState<CourseData[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<CourseData[]> => {
            const res = await fetch('http://localhost:3000/db/courses');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const resp: Resp = await res.json();
            const { courses } = resp;
            return getUniqueListBy<CourseData>(courses, 'courseCode');
        };

        void fetchData().then(data => setCourses(data));
    }, []);

    return courses;
};

export default useFetchCourses;
