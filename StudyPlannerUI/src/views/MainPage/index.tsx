import { useMemo, useState } from 'react';

import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import { useFetch } from 'hooks/useFetchCourses';
import CreditsTable from './components/CreditsTable';
import HorizontalBarChart from './components/HorizontalBarChart';
import SelectedCoursesTable from './components/SelectedCourses';
import { Container, Wrapper } from './style';
import Table from './components/Table';
import { dataParser } from './dataParser';
import { BASE_URL } from 'utils/URL';
import ScrollArrow from './components/ScrollArrow';

type SelectedCourses = Record<4 | 5, CourseData.SelectedCourse[]>;

function MainPage(): JSX.Element {
  const { data, loading, error } = useFetch<API.Response>(BASE_URL + '/db/courses') || [];
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourses>({
    4: [],
    5: []
  });

  const courses = useMemo(() => {
    return dataParser(data, 'course_name_en') || [];
  }, [data]);

  const handleAddCourse = (
    course: CourseData.SelectedCourse,
    year: 4 | 5,
    period: API.Period | null
  ) => {
    const isCourseSelected =
      selectedCourses[4].some(c => c.course_code === course.course_code) ||
      selectedCourses[5].some(c => c.course_code === course.course_code);

    if (!isCourseSelected) {
      const updatedCourse = {
        ...course,
        selectedPeriod: period
      };

      setSelectedCourses(prev => {
        return {
          ...prev,
          [year]: [...prev[year], updatedCourse]
        };
      });
    }
  };

  const handleRemoveCourse = (courseName: string, year: 4 | 5) => {
    setSelectedCourses(prev => {
      return {
        ...prev,
        [year]: prev[year].filter(c => c.course_code !== courseName)
      };
    });
  };

  const handleChangeYear = (courseName: string, year: 4 | 5) => {
    const prevYear = year === 4 ? 5 : 4;
    setSelectedCourses(prev => {
      const course = prev[prevYear].find(c => c.course_code === courseName);
      const removed = prev[prevYear].filter(c => c.course_code !== courseName);
      if (course) {
        const newCourse = { ...course }; // create a new course object with a different reference
        return {
          ...prev,
          [prevYear]: removed,
          [year]: [...prev[year], newCourse]
        };
      }
      return prev;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Wrapper>
        <section id='courses'>
          <Row>
            <Col md={8} lg={8}>
              <Table courses={courses} handleAddCourse={handleAddCourse} />
            </Col>
            <Col lg={4}>
              <CreditsTable />
            </Col>
          </Row>
        </section>
        <section id='selectedCourses'>
          <Row>
            <Col lg={6}>
              <SelectedCoursesTable
                courses={selectedCourses[4]}
                year={4}
                onClickRemove={handleRemoveCourse}
                onChangeYear={handleChangeYear}
              />
            </Col>
            <Col lg={6}>
              <SelectedCoursesTable
                courses={selectedCourses[5]}
                year={5}
                onClickRemove={handleRemoveCourse}
                onChangeYear={handleChangeYear}
              />
            </Col>
          </Row>
        </section>
        <section id='timeplans'>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <h3>Fourth Year</h3>
              <HorizontalBarChart courses={selectedCourses[4]} />
            </Col>
            <Col xs={12} md={6} lg={6}>
              <h3>Fifth Year</h3>
              <HorizontalBarChart courses={selectedCourses[5]} />
            </Col>
          </Row>
        </section>
      </Wrapper>
      <ScrollArrow />
    </Container>
  );
}

export default MainPage;
