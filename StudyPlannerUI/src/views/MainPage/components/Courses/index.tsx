import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import { Section } from 'components/Section';
import React, { ChangeEvent, useState } from 'react';
import CreditsTable from './CreditsTable';
import { FilterBar } from '../FilterBar';
import SearchBar from '../FilterBar/SearchBar';
import Table from './Table';
import { CreditsWrapper } from '../styles';
import { POST } from 'utils/fetch';
import { dataParser } from 'views/MainPage/dataParser';
import { FilterContainer } from './styles';
import type { TransformFn } from 'interfaces/TransformFn';

function Courses() {
  const [filters, setFilters] = useState({
    Programme: '',
    Year: ''
  });
  const [courses, setCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [matches, setMatches] = useState(true);

  const transformCourses = (transformFn: TransformFn) => {
    const result = transformFn([...courses]);

    // If result is a Promise, handle it
    Promise.resolve(result).then(newCourses => {
      if (newCourses.length > 0) {
        setFilteredCourses(newCourses);
        setMatches(true);
      } else {
        setFilteredCourses(courses);
        setMatches(false);
      }
    });
  };

  const handleGetCourses = () => {
    POST('/courses', filters).then(resp => {
      const parsedData = dataParser(resp, 'course_name_en');
      setCourses(parsedData);
      setFilteredCourses(parsedData);
      setMatches(parsedData.length > 0);
    });
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <FilterContainer>
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onGetCourses={handleGetCourses}
        />
      </FilterContainer>

      <Section id='courses'>
        <SearchBar matches={matches} filter={transformCourses} />
        <Row>
          <Col lg={8}>
            <Table courses={filteredCourses} />
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
