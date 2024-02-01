/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL, Endpoints } from 'api/constants';
import { getCoursesByProgramme } from 'api/courses';
import { getMasters } from 'api/master';
import { useStudyplanContext } from 'hooks/CourseContext';
import { DEFAULT_LANG } from 'interfaces/constants';
import { type Filters } from 'interfaces/Types';
import { dataParser } from 'utils/sortCourses';

import { Col, Row } from 'components/Flex';
import Pencil from 'components/Icons/Spinner';
import { Grid } from 'components/Layout/Grid';
import { GridItem } from 'components/Layout/style';
import SelectedCoursesTable from 'components/SelectedCourses/SelectedCourses';
import { Heading2 } from 'components/Typography/Heading2';

import CourseList from '../components/Courses';
import Credits from '../components/Credits';
import FilterBar from '../components/FilterBar';

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

  const { courses: selectedCourses } = useStudyplanContext();

  const programmesQuery = useQuery({
    queryKey: ['programmes'],
    queryFn: () => fetch(BASE_URL + Endpoints.programmes).then(res => res.json()),
    staleTime: Infinity
  });

  const yearsQuery = useQuery({
    queryKey: ['years'],
    queryFn: () => fetch(BASE_URL + Endpoints.classYears).then(res => res.json()),
    staleTime: Infinity
  });

  const masterQuery = useQuery({
    queryKey: ['masters', filters.programme, filters.year],
    queryFn: () => getMasters(filters),
    staleTime: Infinity,
    enabled: !!filters.programme && !!filters.year
  });

  const allSelectedCourses = [...selectedCourses[4], ...selectedCourses[5]];
  const enoughCourses = allSelectedCourses.length >= 4;
  const masters = masterQuery.data ?? [];

  const handleGetCourses = (filterYear: string, masters?: string[]) => {
    const filter = {
      programme: filters.programme,
      year: filterYear,
      masterCodes: masters
    };

    getCoursesByProgramme(filter).then(resp => {
      const parsedData = dataParser(resp, DEFAULT_LANG);
      updateCourses(parsedData);
    });
  };

  const updateCourses = (newCourses: CourseData.DataWithLocale[]) => {
    setCourses(newCourses);
    setFilteredCourses(newCourses);
  };

  const handleFilterChange = (value: string, name: keyof Filters) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (programmesQuery.isLoading || yearsQuery.isLoading) {
    return <Pencil />;
  }

  return (
    <>
      <Row>
        <Col xs={12} id='courses'>
          <FilterBar
            masters={masters}
            filters={filters}
            programmes={programmesQuery.data}
            years={yearsQuery.data}
            onFilterChange={handleFilterChange}
            onGetCourses={handleGetCourses}
            onUpdateCourses={updateCourses}
          />
        </Col>
        <Grid columns={2} gap='1rem' breakpoint='992px'>
          <GridItem order={1} mobileOrder={1}>
            <CourseList
              courses={courses}
              filteredCourses={filteredCourses}
              handleFilteredCourses={setFilteredCourses}
            />
          </GridItem>
          <GridItem order={2} mobileOrder={2}>
            <Credits filters={filters} masters={masters} enoughCourses={enoughCourses} />
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
