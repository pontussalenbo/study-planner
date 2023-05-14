import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import { Section } from 'components/Section';
import React, { useMemo, useState } from 'react';
import CreditsTable from './CreditsTable';
import { FilterBar } from '../FilterBar';
import SearchBar from '../FilterBar/SearchBar';
import Table from './Table';
import { CreditsWrapper } from '../styles';
import { fetchData } from 'utils/fetch';
import { dataParser } from 'views/MainPage/dataParser';

function Courses() {
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
    <>
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
    </>
  );
}

export default Courses;
