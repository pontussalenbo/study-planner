// FilterBar.tsx
import React, { ChangeEvent, useMemo } from 'react';
import { Select } from 'components/Select';
import Tooltip from 'components/Tooltip';
import { SelectWrapper } from './style';
import { GET, POST } from 'utils/fetch';
import { Endpoints } from 'interfaces/API_Constants.d';
import { Filters } from 'interfaces/Types';
import StyledButtonWithIcon from 'components/Button';
import { ReactComponent as ReloadIcon } from 'components/icons/reload-outline.svg';
import { dataParser } from 'views/MainPage/dataParser';

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onGetCourses: (filters: string) => void;
  update: (courses: CourseData.DataWithLocale[]) => void;
}

type Filter = 'Year' | 'Class';

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onGetCourses, update }) => {
  const [filterValues, setFilterValues] = React.useState<string[]>([]);
  const [coursesFilter, setFilterCourses] = React.useState<string>(filters.Year);
  const [masters, setMasters] = React.useState<API.Masters[]>([]);

  React.useEffect(() => {
    fetchFilterValues('Class');
  }, []);

  React.useEffect(() => {
    if (coursesFilter !== '') {
      return;
    }
    setFilterCourses(filters.Year);
  }, [filters]);

  React.useEffect(() => {
    const { Programme, Year } = filters;
    if (!Programme || !Year) {
      return;
    }
    const params = new URLSearchParams({ Programme, Year });
    GET(Endpoints.masters, params).then(data => setMasters(data));
  }, [filters]);

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

  const handleMasterFilter = (master: string) => {
    const { Programme, Year } = filters;
    // TODO: This considers your Study Class, not selected course year
    const body = { Programme, Year, Master: master || undefined };

    POST(Endpoints.courses, body)
      .then(data => dataParser(data, 'course_name_en'))
      .then(data => update(data));
  };

  const handleMasterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleMasterFilter(event.target.value);
  };

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
      <Select defaultValue='' label='By Master' optional onChange={handleMasterChange}>
        <option value=''>All (Default)</option>
        {masters.map(master => (
          <option key={master.master_code} value={master.master_code}>
            {master.master_name_en}
          </option>
        ))}
      </Select>
      <StyledButtonWithIcon
        disabled={disableGetCourses}
        onClick={() => onGetCourses(coursesFilter)}
        text={true}
        icon={<ReloadIcon fill='white' width='0.7rem' />}
      >
        Get Courses
      </StyledButtonWithIcon>
    </SelectWrapper>
  );
};
