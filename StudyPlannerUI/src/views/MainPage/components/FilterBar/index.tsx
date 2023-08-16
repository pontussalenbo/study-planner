// FilterBar.tsx
import React, { ChangeEvent, useState } from 'react';
import { MultiSelect } from 'components/Select';
import Tooltip from 'components/Tooltip';
import { GET, POST } from 'utils/fetch';
import { Endpoints } from 'interfaces/API_Constants.d';
import { Filters } from 'interfaces/Types';
import StyledButtonWithIcon from 'components/Button';
import { ReactComponent as ReloadIcon } from 'components/icons/reload-outline.svg';
import { dataParser } from 'views/MainPage/dataParser';
import { Option } from 'components/Select';

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (value: string, name: keyof Filters) => void;
  onGetCourses: (filters: string) => void;
  update: (courses: CourseData.DataWithLocale[]) => void;
}

enum FilterType {
  Year = 'Year',
  Class = 'Class',
  None = ''
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onGetCourses, update }) => {
  const [filterValues, setFilterValues] = React.useState<string[]>([]);
  const [filterType, setFilterType] = React.useState<FilterType>(FilterType.None);
  const [classYearFilter, setClassYearFilter] = React.useState<string>('');
  const [masters, setMasters] = React.useState<API.Masters[]>([]);
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);

  React.useEffect(() => {
    if (filters.Year && classYearFilter === '') {
      setClassYearFilter(filters.Year);
    }

    if (filterType === FilterType.Year) {
      setClassYearFilter('');
    }
  }, [filters.Year, filterType]);

  React.useEffect(() => {
    if (filterType) {
      fetchFilterValues(filterType);
    }
  }, [filterType]);

  React.useEffect(() => {
    const { Programme, Year } = filters;

    if (Programme && Year) {
      const params = new URLSearchParams({ Programme, Year });
      GET(Endpoints.masters, params).then(data => setMasters(data));
    }
  }, [filters]);

  const fetchFilterValues = async (filter: FilterType) => {
    const urls = {
      Class: Endpoints.classYears,
      Year: Endpoints.academicYears
    };

    if (filter) {
      const data = await GET(urls[filter]);
      setFilterValues(data);
    }
  };

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

  const hasProgramme = filters.Programme !== '';
  const hasYear = filters.Year !== '';
  const hasFilterBy = filterType !== '';

  const disableMasterSelection = !hasProgramme || !hasYear;
  const disableGetCourses = filters.Programme === '' || classYearFilter === '';

  const masterTooltip = !hasProgramme ? 'Please select a Programme' : 'Please select a Year';

  return (
    <>
      <MultiSelect value={filterType} label='Filter by' onChange={setFilterType}>
        <Option value='Class'>Class</Option>
        <Option value='Year'>Year</Option>
      </MultiSelect>

      <Tooltip text='Please select a filter' enabled={!hasFilterBy}>
        <MultiSelect
          enabled={hasFilterBy}
          label={filterType}
          value={classYearFilter}
          onChange={setClassYearFilter}
        >
          <Option value=''>Select</Option>
          {filterValues.map(filter => (
            <Option key={filter} value={filter}>
              {filter}
            </Option>
          ))}
        </MultiSelect>
      </Tooltip>

      <Tooltip text={masterTooltip} enabled={disableMasterSelection}>
        <MultiSelect
          enabled={!disableMasterSelection}
          label='masters'
          multiple
          value={multiSelectValue}
          onChange={setMultiSelectValue}
        >
          <Option value=''>All (Default)</Option>
          {masters.map(master => (
            <Option key={master.master_code} value={master.master_code}>
              {master.master_name_en}
            </Option>
          ))}
        </MultiSelect>
      </Tooltip>

      <StyledButtonWithIcon
        disabled={disableGetCourses}
        onClick={() => onGetCourses(classYearFilter)}
        text
        icon={<ReloadIcon width='0.7rem' />}
      >
        Get Courses
      </StyledButtonWithIcon>
    </>
  );
};
