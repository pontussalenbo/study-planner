import { useMemo, useState } from 'react';

import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import { Section } from 'components/Section';
import { Heading2 } from 'components/Typography/Heading2';
import { fetchData } from 'utils/fetch';
import CreditsTable from './components/CreditsTable';
import { FilterBar } from './components/FilterBar';
import SearchBar from './components/FilterBar/SearchBar';
import HorizontalBarChart from './components/HorizontalBarChart';
import ScrollArrow from './components/ScrollArrow';
import SelectedCoursesTable from './components/SelectedCourses';
import Table from './components/Table';
import { CreditsWrapper } from './components/styles';
import { dataParser } from './dataParser';
import { Container, Wrapper } from './style';

function MainPage(): JSX.Element {
  const [filters, setFilters] = useState({
    Programme: '',
    Year: ''
  });
  const [courses, setCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData.DataWithLocale[]>([]);

  const displayCourses = useMemo(() => {
    if (!filteredCourses.length) {
      return courses;
    }
    return filteredCourses;
  }, [courses, filteredCourses]);

  const matches = useMemo(() => {
    return filteredCourses.length > 0;
  }, [filteredCourses]);

  const handleGetCourses = () => {
    fetchData(filters).then(resp => setCourses(dataParser(resp, 'course_name_en')));
  };

  const filterSearch = (search: string) => {
    const filteredCourses = courses.filter(
      course =>
        course.course_name.toLowerCase().includes(search.toLowerCase()) ||
        course.course_code.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <Wrapper>
        <div style={{ display: 'flex', width: 'max-content' }}>
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onGetCourses={handleGetCourses}
          />
        </div>

        <Section id='courses'>
          <SearchBar matches={matches} setSearch={filterSearch} />
          <Row>
            <Col lg={8}>
              <Table courses={displayCourses} />
            </Col>
            <Col md={6} lg={4}>
              <CreditsWrapper>
                <CreditsTable filters={filters} />
              </CreditsWrapper>
            </Col>
          </Row>
        </Section>
        <Section id='selectedCourses'>
          <Row>
            <Col md={6}>
              <Heading2>Fourth Year</Heading2>
              <SelectedCoursesTable year={4} />
              <HorizontalBarChart year={4} />
            </Col>
            <Col md={6}>
              <Heading2>Fifth Year</Heading2>
              <SelectedCoursesTable year={5} />
              <HorizontalBarChart year={5} />
            </Col>
          </Row>
        </Section>
      </Wrapper>
      <ScrollArrow />
    </Container>
  );
}

export default MainPage;
