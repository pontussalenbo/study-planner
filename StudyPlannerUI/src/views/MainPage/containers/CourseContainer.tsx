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
import { getMasters } from 'api/master';
import { useStudyplanContext } from 'hooks/CourseContext';
import { Filters } from 'interfaces/Types';

import { Col } from 'components/Flex';
import { Grid, GridItem } from 'components/Layout';

import CourseList from '../components/Courses';
import Credits from '../components/Credits';
import FilterBar from '../components/FilterBar';

const Refactored = () => {
  const [courses, setCourses] = useState<CourseData.DataWithLocale[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData.DataWithLocale[]>([]);

  const { courses: selectedCourses, filters, setFilters } = useStudyplanContext();

  const masterQuery = useQuery({
    queryKey: ['masters', filters.programme, filters.year],
    queryFn: () => getMasters(filters),
    staleTime: Infinity,
    enabled: !!filters.programme && !!filters.year
  });

  const allSelectedCourses = [...selectedCourses[4], ...selectedCourses[5]];
  const enoughCourses = allSelectedCourses.length >= 4;
  const masters = masterQuery.data ?? [];

  const updateCourses = (newCourses: CourseData.DataWithLocale[]) => {
    setCourses(newCourses);
    setFilteredCourses(newCourses);
  };

  const handleFilterChange = (value: string, name: keyof Filters) => {
    setFilters({ ...filters, [name]: value });
  };
  return (
    <>
      <Col xs={12} id='courses'>
        <FilterBar
          masters={masters}
          filters={filters}
          onFilterChange={handleFilterChange}
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
    </>
  );
};

export default Refactored;
