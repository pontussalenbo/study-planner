// FilterBar.tsx
import React, { ChangeEvent } from 'react';
import { Select } from 'components/Select';
import Tooltip from 'components/Tooltip';
import useFetch from 'hooks/useFetch';
import { BASE_URL } from 'utils/URL';
import { GetButton, SelectWrapper } from './style';
import { GET } from 'utils/fetch';
import { Endpoints } from 'interfaces/API_Constants.d';

interface FilterBarProps {
  filters: Record<string, string>;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onGetCourses: () => void;
}

type Filter = 'Year' | 'Class';

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onGetCourses
}) => {
  const programmes = useFetch<string[]>(BASE_URL + Endpoints.programmes) || [];
  const [filterValues, setFilterValues] = React.useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e);
  };

  const fetchFilterValues = async (filter: Filter) => {
    const urls = {
      Class: Endpoints.classYears,
      Year: Endpoints.academicYears
    };

    const data = await GET(urls[filter]);
    setFilterValues(data);
  };

  return (
    <SelectWrapper>
      <Select
        label='Programme'
        options={programmes.data || []}
        defaultValue=''
        name='Programme'
        onChange={handleChange}
      >
        <option value='' disabled>
          Select
        </option>
      </Select>
      <Select
        label='Filter by'
        options={['Class', 'Year']}
        defaultValue=''
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
          defaultValue=''
          name='Year'
          onChange={handleChange}
          disabled={!filterValues.length}
        >
          <option value='' disabled>
            Select
          </option>
        </Select>
      </Tooltip>
      <GetButton
        disabled={filters.Programme === '' || filters.Year === ''}
        onClick={() => onGetCourses()}
      >
        Get Courses
      </GetButton>
    </SelectWrapper>
  );
};
