/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { Filters } from 'interfaces/Types';

import { FilterContainer } from 'components/Temp/styles';
import { Heading2 } from 'components/Typography/Heading2';

import { CoursesFilter } from './CoursesFilter';
import ProgrammeFilter from './ProgrammeFilter';

interface FilterBarProps {
  filters: Filters;
  masters: API.Master[];
  programmes: string[];
  years: string[];
  onFilterChange: (value: string, name: keyof Filters) => void;
  onGetCourses: (filters: string, masters?: string[]) => void;
  onUpdateCourses: (courses: CourseData.DataWithLocale[]) => void;
}

const FilterBar = ({
  filters,
  masters,
  programmes,
  years,
  onFilterChange,
  onGetCourses,
  onUpdateCourses
}: FilterBarProps) => {
  return (
    <>
      <Heading2>Select Programme</Heading2>
      <FilterContainer>
        <ProgrammeFilter
          years={years}
          programmes={programmes}
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </FilterContainer>
      <Heading2>Search Courses</Heading2>
      <FilterContainer>
        <CoursesFilter
          filters={filters}
          masters={masters}
          onFilterChange={onFilterChange}
          onGetCourses={onGetCourses}
          update={onUpdateCourses}
        />
      </FilterContainer>
    </>
  );
};

export default FilterBar;
