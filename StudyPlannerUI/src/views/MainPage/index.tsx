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
import { Section } from 'components/Section';
import { CreditsWrapper } from './components/styles';
import { Heading2 } from 'components/Typography/Heading2';

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
        <Section id='courses'>
          <Row>
            <Col lg={8}>
              <Table courses={courses} handleAddCourse={handleAddCourse} />
            </Col>
            <Col md={6} lg={4}>
              <CreditsWrapper>
                <CreditsTable />
              </CreditsWrapper>
            </Col>
          </Row>
        </Section>
        <Section id='selectedCourses'>
          <Row>
            <Col md={6}>
              <Heading2>Fourth Year</Heading2>
              <SelectedCoursesTable
                courses={selectedCourses[4]}
                year={4}
                onClickRemove={handleRemoveCourse}
                onChangeYear={handleChangeYear}
              />
              <HorizontalBarChart courses={selectedCourses[4]} />
            </Col>
            <Col md={6}>
              <Heading2>Fifth Year</Heading2>
              <SelectedCoursesTable
                courses={selectedCourses[5]}
                year={5}
                onClickRemove={handleRemoveCourse}
                onChangeYear={handleChangeYear}
              />
              <HorizontalBarChart courses={selectedCourses[5]} />
            </Col>
          </Row>
        </Section>
      </Wrapper>
      <ScrollArrow />
    </Container>
  );
}

export default MainPage;
