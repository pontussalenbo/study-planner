/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useQuery } from '@tanstack/react-query';
import { BASE_URL, Endpoints } from 'api/constants';
import { Filters } from 'interfaces/Types';

import { FilterContainer } from 'components/Temp/styles';
import { Heading2 } from 'components/Typography/Heading2';

import { CoursesFilter } from './CoursesFilter';
import ProgrammeFilter from './ProgrammeFilter';

interface FilterBarProps {
  filters: Filters;
  masters: API.Master[];
  onFilterChange: (value: string, name: keyof Filters) => void;
  onUpdateCourses: (courses: CourseData.DataWithLocale[]) => void;
  setLoading?: (loading: boolean) => void;
}

const FilterBar = ({ filters, masters, onFilterChange, onUpdateCourses }: FilterBarProps) => {
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

  return (
    <>
      <Heading2>Select Programme</Heading2>
      <FilterContainer>
        <ProgrammeFilter
          years={yearsQuery.data}
          programmes={programmesQuery.data}
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
          updateCourses={onUpdateCourses}
        />
      </FilterContainer>
    </>
  );
};

export default FilterBar;
