import { useState } from 'react';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import { Select, Option } from 'components/Select';
import useFetch from 'hooks/useFetch';
import { Endpoints } from 'interfaces/API_Constants.d';
import type { Filters, TransformFn } from 'interfaces/Types';
import { BASE_URL } from 'utils/URL';
import { POST } from 'utils/fetch';
import { dataParser } from 'views/MainPage/dataParser';
import { FilterBar } from '../FilterBar';
import SearchBar from '../FilterBar/SearchBar';
import CreditsTable from './CreditsTable';
import { FilterContainer } from './styles';
import { Heading2 } from 'components/Typography/Heading2';
import SelectedCoursesTable from '../SelectedCourses/SelectedCourses';
import VirtualizedTable from './InfiniteScroll';
import Pencil from 'components/icons/Spinner';

function Courses() {
  const [filters, setFilters] = useState<Filters>({
    Programme: '',
    Year: ''
  });
  const [courses, setCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [matches, setMatches] = useState(true);

  const { data: programmes, loading: loadingPrograms } = useFetch<string[]>(BASE_URL + Endpoints.programmes);
  const { data: years, loading: loadingYears } = useFetch<string[]>(BASE_URL + Endpoints.classYears);

  const filterCourses = (transformFn: TransformFn) => {
    const result = transformFn([...courses]);

    // If result is a Promise, handle it
    Promise.resolve(result).then(results => {
      const hasMatches = results.length > 0;
      const newCourses = hasMatches ? results : courses;

      setMatches(hasMatches);
      setFilteredCourses(newCourses);
    });
  };

  const updateCourses = (newCourses: CourseData.DataWithLocale[]) => {
    setCourses(newCourses);
    setFilteredCourses(newCourses);
  };

  const handleGetCourses = (filterYear: string, masters?: string[]) => {
    const coursesFiter = {
      Programme: filters.Programme,
      Year: filterYear,
      MasterCodes: masters
    };

    POST<API.CourseData[]>(Endpoints.courses, coursesFiter).then(resp => {
      const parsedData = dataParser(resp, 'course_name_en');
      setCourses(parsedData);
      setFilteredCourses(parsedData);
      setMatches(parsedData.length > 0);
    });
  };

  const handleFilterChange = (value: string, name: keyof Filters) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProgrammeChange = (value: string) => {
    handleFilterChange(value, 'Programme');
  };

  const handleYearChange = (value: string) => {
    handleFilterChange(value, 'Year');
  };

  if (loadingPrograms || loadingYears) {
    return <Pencil />;
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <Heading2>Study Period</Heading2>
          <FilterContainer>
            <Select value={filters.Programme} label='Programme' onChange={handleProgrammeChange}>
              <Option value=''>Select</Option>
              {programmes?.map(programme => (
                <Option key={programme} value={programme}>
                  {programme}
                </Option>
              ))}
            </Select>
            <Select value={filters.Year} label='Year' onChange={handleYearChange}>
              <Option value=''>Select</Option>
              {years?.map(year => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </FilterContainer>
          <Heading2>Courses</Heading2>
          <FilterContainer>
            <FilterBar
              onFilterChange={handleFilterChange}
              onGetCourses={handleGetCourses}
              update={updateCourses}
              filters={filters}
            />
          </FilterContainer>

          <SearchBar matches={matches} filter={filterCourses} />
        </Col>

        <Col xs={12} lg={7}>
          <VirtualizedTable courses={filteredCourses} />
        </Col>

        <Col xs={12} lg={5}>
          <CreditsTable filters={filters} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} lg={6}>
          <Heading2>Fourth Year</Heading2>
          <SelectedCoursesTable year={4} />
        </Col>

        <Col xs={12} lg={6}>
          <Heading2>Fifth Year</Heading2>
          <SelectedCoursesTable year={5} />
        </Col>
      </Row>
    </>
  );
}

export default Courses;
