/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import type { SelectedCourse } from 'interfaces/SelectedCourse';
import { useEffect, useState } from 'react';
import CoursesTable from './components/CoursesTable';
import HorizontalBarChart from './components/HorizontalBarChart';
import { Container, Wrapper } from './style';

export interface Period {
    periodStart: number;
    periodEnd: number;
}

export interface CourseData {
    courseCode: string;
    credits: number;
    cycle: string;
    name_en: string;
    period: Period;
}

type SelectedCourses = Record<number, SelectedCourse[]>;

function getUniqueListBy<T = unknown>(arr: T[], key: keyof T): T[] {
    return [...new Map(arr.map(item => [item[key], item])).values()];
}

function MainPage(): JSX.Element {
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set());
    const [selectedCourses, setSelectedCourses] = useState<SelectedCourses>({
        4: [],
        5: []
    });

    const contents = ['courseCode', 'credits', 'cycle', 'name_en', 'periods'];

    const onClickAddCourse = (course: SelectedCourse): void => {
        if (!selectedNames.has(course.courseCode)) {
            setSelectedNames(names => new Set([...names, course.courseCode]));
            const { year } = course;
            const newCourses = { ...selectedCourses };
            newCourses[year].push(course);
            setSelectedCourses(_ => newCourses);
        }
    };

    useEffect(() => {
        const getData = async (): Promise<any[]> => {
            const res = await fetch('http://localhost:3000/db/courses');
            const resp = await res.json();
            const { courses } = resp;
            return getUniqueListBy(courses, 'courseCode');
        };
        void getData().then(data => setCourses(data));
    }, []);

    return (
        <Container>
            <Wrapper>
                <CoursesTable
                    addCourse={onClickAddCourse}
                    dataProps={contents}
                    data={courses}
                    rowsPerPage={7}
                />
                <div style={{ display: 'flex' }}>
                    <HorizontalBarChart courses={Array.from(selectedCourses[4])} />
                    <HorizontalBarChart courses={Array.from(selectedCourses[5])} />
                </div>
            </Wrapper>
        </Container>
    );
}

export default MainPage;
