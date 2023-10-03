import { useEffect, useState } from 'react';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import useFetch from 'hooks/useFetch';
import { BASE_URL, Endpoints } from 'interfaces/API_Constants.d';
import type { Filters, TransformFn } from 'interfaces/Types';
import { POST } from 'utils/fetch';
import { CoursesFilter } from '../CoursesFilter';
import SearchBar from '../CoursesFilter/SearchBar';
import CreditsTable from './CreditsTable';
import { FilterContainer, GetStatsBar } from 'components/Temp/styles';
import { Heading2 } from 'components/Typography/Heading2';
import SelectedCoursesTable from 'components/SelectedCourses/SelectedCourses';
import VirtualizedTable from './InfiniteScroll';
import Pencil from 'components/Icons/Spinner';
import { dataParser } from 'utils/sortCourses';
import ProgrammeFilter from '../ProgrammeFilter';
import IconButton from 'components/Button/Button';
import ReloadIcon from 'components/Icons/Reload';
import SavePlanModal from 'components/Modal/SavePlanModal';
import StickyButton from 'components/Button/StickyButton';
import Tooltip from 'components/Tooltip';
import { useStudyplanContext } from 'hooks/CourseContext';
import { Grid, GridItem } from 'components/Layout/Grid';
import FlexContainer from 'components/Layout';
import AddCourse from './AddCourse';

interface CourseProps {
  initFilters?: Filters;
}

const initialFilters: Filters = {
  Programme: '',
  Year: ''
};

const Courses: React.FC<CourseProps> = ({ initFilters = initialFilters }) => {
  const [filters, setFilters] = useState<Filters>(initFilters);

  const [courses, setCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [matches, setMatches] = useState(true);

  const [stats, setStats] = useState<API.MasterStatus[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: programmes, loading: loadingPrograms } = useFetch<string[]>(
    BASE_URL + Endpoints.programmes
  );
  const { data: years, loading: loadingYears } = useFetch<string[]>(
    BASE_URL + Endpoints.classYears
  );

  const { courses: c, loaded } = useStudyplanContext();

  const selectedCourses = [...c[4], ...c[5]];

  const getMasterStats = async (signal?: AbortController) => {
    const courseCodes = selectedCourses.map(course => course.course_code);
    const body = {
      ...filters,
      selectedCourses: courseCodes
    };

    const data = await POST<API.MasterStatus[]>(Endpoints.masterCheck, body, signal);
    return data;
  };

  useEffect(() => {
    const signal = new AbortController();

    if (!loaded) {
      return;
    }
    getMasterStats(signal).then(data => {
      setStats(data);
    });

    handleGetCourses(filters.Year);
    return () => {
      signal.abort();
    };
  }, [loaded]);

  const handleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleUpdate = async () => {
    const stats = await getMasterStats();
    setStats(stats);
  };

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

  const enoughCourses = selectedCourses.length >= 4;

  const handleFilterChange = (value: string, name: keyof Filters) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loadingPrograms || loadingYears) {
    return <Pencil />;
  }

  return (
    <>
      <Row>
        <Col xs={12} id='courses'>
          <Heading2>Select Programme</Heading2>
          <FilterContainer>
            <ProgrammeFilter
              years={years}
              programmes={programmes}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </FilterContainer>
          <Heading2>Search Courses</Heading2>
          <FilterContainer>
            <CoursesFilter
              onFilterChange={handleFilterChange}
              onGetCourses={handleGetCourses}
              update={updateCourses}
              filters={filters}
            />
          </FilterContainer>
        </Col>

        <Grid columns={2} gap='20px' breakpoint='992px'>
          <GridItem id='courses' order={1} mobileOrder={1}>
            <FlexContainer align='flex-end' justify='space-between'>
              <SearchBar matches={matches} filter={filterCourses} />
              <AddCourse />
            </FlexContainer>
          </GridItem>

          <GridItem id='master-check' order={2} mobileOrder={3}>
            {/** TODO: Refactor to separate component */}
            <GetStatsBar>
              <Tooltip enabled={!enoughCourses} text='Needs atleast 4 courses'>
                <IconButton
                  disabled={!enoughCourses}
                  onClick={handleUpdate}
                  icon={<ReloadIcon fill='white' width='0.8rem' />}
                >
                  Check Masters
                </IconButton>
              </Tooltip>
              <StickyButton
                variant='secondary'
                onClick={handleModal}
                icon={<ReloadIcon fill='white' width='0.8rem' />}
              >
                Save Plan
              </StickyButton>
              <SavePlanModal data={filters} isOpen={isModalOpen} onClose={handleModal} />
            </GetStatsBar>
          </GridItem>

          <GridItem order={3} mobileOrder={2}>
            <VirtualizedTable courses={filteredCourses} />
          </GridItem>

          <GridItem order={4} mobileOrder={4}>
            <CreditsTable stats={stats} filters={filters} />
          </GridItem>
        </Grid>
      </Row>

      <Row id='my-plan'>
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
};

export default Courses;
