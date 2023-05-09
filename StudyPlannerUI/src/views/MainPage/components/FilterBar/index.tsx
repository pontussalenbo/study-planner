// FilterBar.tsx
import React from 'react';
import { Select } from 'components/Select';
import Tooltip from 'components/ToolTip';
import useFetch from 'hooks/useFetch';
import { Event as ChangeEvent } from 'interfaces/Event.d';
import { BASE_URL } from 'utils/URL';
import { GetButton, SelectWrapper } from './style';

type FilterBarProps = {
  filters: Record<string, string>;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onGetCourses: () => void;
};

type Filter = 'Year' | 'Class';

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onGetCourses
}) => {
  const programmes = useFetch<string[]>(BASE_URL + '/general/programmes') || [];
  const [filterValues, setFilterValues] = React.useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e);
  };

  const fetchFilterValues = async (filter: 'Class' | 'Year') => {
    const urls = {
      Class: BASE_URL + '/general/class_years',
      Year: BASE_URL + '/general/academic_years'
    };
    const res = await fetch(`${urls[filter]}`);
    const data = await res.json();
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
      <Tooltip
        text='Please select a filter'
        disabled={!filterValues.length}
        position='bottom'
      >
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
