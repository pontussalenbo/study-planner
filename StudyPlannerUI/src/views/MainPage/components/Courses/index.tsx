/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useEffect, useState } from 'react';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import useFetch from 'hooks/useFetch';
import { BASE_URL, Endpoints } from 'api/constants';
import { type Filters, type TransformFn } from 'interfaces/Types';
import { DEFAULT_LANG } from 'interfaces/constants';
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
import AddCourse from './AddCourseModal';
import { useToastContext } from 'hooks/useToast';
import { getMasterStats, getMasters } from 'api/master';
import { getCoursesByProgramme } from 'api/courses';

interface CourseProps {
  initFilters?: Filters;
}

const initialFilters: Filters = {
  programme: '',
  year: ''
};

const Courses: React.FC<CourseProps> = ({ initFilters = initialFilters }) => {
  const [filters, setFilters] = useState<Filters>(initFilters);

  const [courses, setCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [matches, setMatches] = useState(true);

  const [masters, setMasters] = useState<API.Master[]>([]);
  const [stats, setStats] = useState<API.MasterStatus[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { courses: c, loaded, urls, savePlan, loadedPlan } = useStudyplanContext();

  const selectedCourses = [...c[4], ...c[5]];

  const toastDispatch = useToastContext();

  useEffect(() => {
    const signal = new AbortController();

    if (!filters.programme || !filters.year) {
      return;
    }

    const params = {
      programme: filters.programme,
      year: filters.year
    };

    getMasters(params, signal).then(data => {
      setMasters(data);
    });

    return () => {
      signal.abort();
    };
  }, [filters.programme, filters.year]);

  useEffect(() => {
    const signal = new AbortController();

    if (!loaded) {
      return;
    }

    handleUpdateMasterStats(signal);
    handleGetCourses(filters.year.toString());

    return () => {
      signal.abort();
    };
  }, [loaded]);

  const { data: programmes, loading: loadingPrograms } = useFetch<string[]>(
    BASE_URL + Endpoints.programmes
  );
  const { data: years, loading: loadingYears } = useFetch<string[]>(
    BASE_URL + Endpoints.classYears
  );

  const handleModal = () => {
    if (urls.sId || (loaded && !loadedPlan.readOnly)) {
      savePlan(filters).then(() => {
        toastDispatch.showToast('Plan saved!', 'success', 3);
      });
    } else {
      setIsModalOpen(prev => !prev);
    }
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
    const filter = {
      programme: filters.programme,
      year: filterYear,
      masterCodes: masters
    };

    getCoursesByProgramme(filter).then(resp => {
      const parsedData = dataParser(resp, DEFAULT_LANG);
      setCourses(parsedData);
      setFilteredCourses(parsedData);
      setMatches(parsedData.length > 0);
    });
  };

  const handleUpdateMasterStats = async (signal?: AbortController) => {
    const courseCodes = selectedCourses.map(course => course.courseCode);
    const body = {
      ...filters,
      selectedCourses: courseCodes
    };

    const stats = await getMasterStats(body, signal);
    setStats(stats);
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
              masters={masters}
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
                  onClick={() => handleUpdateMasterStats()}
                  icon={<ReloadIcon fill='white' width='0.8rem' />}
                >
                  Check Masters
                </IconButton>
              </Tooltip>
              <StickyButton
                disabled={!enoughCourses}
                variant='primary'
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
            <CreditsTable stats={stats} masters={masters} />
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

Courses.whyDidYouRender = true;

export default Courses;
