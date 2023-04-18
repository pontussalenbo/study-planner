import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import type { SelectedCourse } from 'interfaces/SelectedCourse';
import { useState } from 'react';
import CoursesTable from './components/CoursesTable';
import CreditsTable from './components/CreditsTable';
import HorizontalBarChart from './components/HorizontalBarChart';
import SelectedCoursesTable from './components/SelectedCourses';
import { Container, Wrapper } from './style';
import useFetchCourses from 'hooks/useFetchCourses';

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

function MainPage(): JSX.Element {
    const courses = useFetchCourses();

    const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set());
    const [selectedCourses, setSelectedCourses] = useState<SelectedCourses>({
        4: [],
        5: []
    });

    const contents = ['courseCode', 'credits', 'cycle', 'name_en', 'periods'];

    const getAllSelectedCourses = (): SelectedCourse[] =>
        selectedCourses[4].concat(selectedCourses[5]);

    const onClickAddCourse = (course: SelectedCourse): void => {
        if (!selectedNames.has(course.courseCode)) {
            setSelectedNames(names => new Set([...names, course.courseCode]));
            const { year } = course;
            const newCourses = { ...selectedCourses };
            newCourses[year].push(course);
            setSelectedCourses(_ => newCourses);
        }
    };

    return (
        <Container>
            <Wrapper>
                <Row>
                    <Col md={8}>
                        <CoursesTable
                            addCourse={onClickAddCourse}
                            dataProps={contents}
                            data={courses}
                            rowsPerPage={7}
                        />
                    </Col>
                    <Col md={3}>
                        <CreditsTable courses={selectedCourses} />
                        <SelectedCoursesTable courses={getAllSelectedCourses()} />
                    </Col>
                </Row>

                <div style={{ display: 'flex' }}>
                    <HorizontalBarChart courses={Array.from(selectedCourses[4])} />
                    <HorizontalBarChart courses={Array.from(selectedCourses[5])} />
                </div>
            </Wrapper>
        </Container>
    );
}

export default MainPage;
