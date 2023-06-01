import { ChangeEvent, useState } from 'react';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import { Section } from 'components/Section';
import { Select } from 'components/Select';
import useFetch from 'hooks/useFetch';
import { Endpoints } from 'interfaces/API_Constants.d';
import type { Filters, TransformFn } from 'interfaces/Types';
import { BASE_URL } from 'utils/URL';
import { POST } from 'utils/fetch';
import { dataParser } from 'views/MainPage/dataParser';
import { FilterBar } from '../FilterBar';
import SearchBar from '../FilterBar/SearchBar';
import { CreditsWrapper } from '../styles';
import CreditsTable from './CreditsTable';
import Table from './Table';
import { FilterContainer } from './styles';

function Courses() {
  const [filters, setFilters] = useState<Filters>({
    Programme: '',
    Year: ''
  });
  const [courses, setCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [matches, setMatches] = useState(true);

  const { data: programmes } = useFetch<string[]>(BASE_URL + Endpoints.programmes);
  const { data: years } = useFetch<string[]>(BASE_URL + Endpoints.classYears);

  const filterCourses = (transformFn: TransformFn) => {
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

  const updateCourses = (newCourses: CourseData.DataWithLocale[]) => {
    setCourses(newCourses);
    setFilteredCourses(newCourses);
  };

  const handleGetCourses = (filterYear: string) => {
    const coursesFiter = {
      Programme: filters.Programme,
      Year: filterYear
    };
    POST(Endpoints.courses, coursesFiter).then(resp => {
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
        <Select label='Programme' options={programmes} name='Programme' onChange={handleFilterChange}>
          <option value=''>Select</option>
        </Select>
        <Select label='Year' options={years} name='Year' onChange={handleFilterChange}>
          <option value=''>Select</option>
        </Select>
      </FilterContainer>
      <Section id='courses'>
        <FilterContainer>
          <FilterBar
            update={updateCourses}
            filters={filters}
            onFilterChange={handleFilterChange}
            onGetCourses={handleGetCourses}
          />
        </FilterContainer>
        <SearchBar matches={matches} filter={filterCourses} />
        <Row>
          <Col lg={7}>
            <Table courses={filteredCourses} />
          </Col>
          <Col lg={5}>
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
