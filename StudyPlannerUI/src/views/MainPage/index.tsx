import { useState } from 'react';

import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import { Section } from 'components/Section';
import { Heading2 } from 'components/Typography/Heading2';
import CreditsTable from './components/CreditsTable';
import HorizontalBarChart from './components/HorizontalBarChart';
import ScrollArrow from './components/ScrollArrow';
import SelectedCoursesTable from './components/SelectedCourses';
import Table from './components/Table';
import { CreditsWrapper } from './components/styles';
import { Container, Wrapper } from './style';
import { dataParser } from './dataParser';
import { StyledButton } from 'components/Button';
import { fetchData } from 'utils/fetch';

type SelectedCourses = Record<4 | 5, CourseData.SelectedCourse[]>;

function MainPage(): JSX.Element {
  // const { data, loading, error } = useFetch<API.Response>(BASE_URL + COURSES_URL) || [];
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourses>({
    4: [],
    5: []
  });

  // TODO: Any typings
  const [courses, setCourses] = useState<any>([]);

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

  const handleGetCourses = (data?: any) => {
    //TODO: apply filters when fetching data
    fetchData({ Programme: 'D', Year: 'H19' }).then(resp =>
      setCourses(dataParser(resp, 'course_name_en'))
    );
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

  return (
    <Container>
      <Wrapper>
        <StyledButton onClick={() => handleGetCourses()}>Get Courses</StyledButton>
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
