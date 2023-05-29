// FilterBar.tsx
import React, { ChangeEvent, useMemo } from 'react';
import { Select } from 'components/Select';
import Tooltip from 'components/Tooltip';
import { GetButton, SelectWrapper } from './style';
import { GET } from 'utils/fetch';
import { Endpoints } from 'interfaces/API_Constants.d';

type Filters = {
  Programme: string;
  Year: string;
};

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onGetCourses: (filters: string) => void;
}

type Filter = 'Year' | 'Class';

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onGetCourses }) => {
  const [filterValues, setFilterValues] = React.useState<string[]>([]);
  const [coursesFilter, setFilterCourses] = React.useState<string>(filters.Year);

  React.useEffect(() => {
    if (coursesFilter !== '') {
      return;
    }
    setFilterCourses(filters.Year);
  }, [filters]);

  React.useEffect(() => {
    fetchFilterValues('Class');
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilterCourses(value);
  };

  const fetchFilterValues = async (filter: Filter) => {
    const urls = {
      Class: Endpoints.classYears,
      Year: Endpoints.academicYears
    };

    const data = await GET(urls[filter]);
    setFilterValues(data);
  };

  const disableGetCourses = useMemo(() => {
    return filters.Programme === '' || filters.Year === '';
  }, [filters]);

  return (
    <SelectWrapper>
      <Select
        label='Filter by'
        options={['Class', 'Year']}
        defaultValue='Class'
        name='Year'
        onChange={e => fetchFilterValues(e.target.value as Filter)}
      >
        <option value='' disabled>
          Select
        </option>
      </Select>
      <Tooltip text='Please select a filter' enabled={!filterValues.length}>
        <Select
          label='Year/Class'
          options={filterValues || []}
          value={coursesFilter || filters.Year}
          name='Year'
          onChange={handleChange}
        >
          <option value='' disabled>
            Select
          </option>
        </Select>
      </Tooltip>
      <GetButton disabled={disableGetCourses} onClick={() => onGetCourses(coursesFilter)}>
        Get Courses
      </GetButton>
    </SelectWrapper>
  );
};
