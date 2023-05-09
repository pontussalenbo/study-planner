// FilterBar.tsx
import { StyledButton } from 'components/Button';
import React from 'react';
import { Event as ChangeEvent } from 'interfaces/Event.d';
import useFetch from 'hooks/useFetch';
import { BASE_URL } from 'utils/URL';
import styled from 'styled-components';
import Tooltip from 'components/ToolTip';

type FilterBarProps = {
  filters: Record<string, string>;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onGetCourses: () => void;
};

const SelectWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onGetCourses
}) => {
  const programmes = useFetch<string[]>(BASE_URL + '/general/programmes') || [];
  const academicYears = useFetch<string[]>(BASE_URL + '/general/academic_years') || [];
  const classes = useFetch<string[]>(BASE_URL + '/general/class_years') || [];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e);
  };

  return (
    <SelectWrapper>
      <select defaultValue='' name='Programme' onChange={handleChange}>
        <option value='' disabled>
          programme
        </option>
        {programmes.data?.map((programme, index) => (
          <option key={index}>{programme}</option>
        ))}
      </select>
      <Tooltip
        text='Cannot select a year if class is selected'
        position='bottom'
        disabled={!!filters.Class}
      >
        <select
          defaultValue=''
          name='Year'
          disabled={!!filters.Class}
          onChange={handleChange}
        >
          <option value='' disabled>
            year
          </option>
          {academicYears.data?.map((year, index) => (
            <option key={index}>{year}</option>
          ))}
        </select>
      </Tooltip>
      <Tooltip
        text='Cannot select a class if year is selected'
        position='bottom'
        disabled={!!filters.Year}
      >
        <select
          defaultValue=''
          name='Class'
          disabled={!!filters.Year}
          onChange={handleChange}
        >
          <option value='' disabled>
            class
          </option>
          {classes.data?.map((classYear, index) => (
            <option key={index}>{classYear}</option>
          ))}
        </select>
      </Tooltip>
      <StyledButton
        disabled={
          filters.Programme === '' || (filters.Year === '' && filters.Class === '')
        }
        onClick={() => onGetCourses()}
      >
        Get Courses
      </StyledButton>
    </SelectWrapper>
  );
};
