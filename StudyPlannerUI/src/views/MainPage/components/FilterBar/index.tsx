// FilterBar.tsx
import React, { useState } from 'react';
import Tooltip from 'components/Tooltip';
import { GET, POST } from 'utils/fetch';
import { Endpoints } from 'interfaces/API_Constants.d';
import { Filters } from 'interfaces/Types';
import StyledButtonWithIcon from 'components/Button';
import { ReactComponent as ReloadIcon } from 'components/icons/reload-outline.svg';
import { dataParser } from 'views/MainPage/dataParser';
import { Option, Select } from 'components/Select';

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (value: string, name: keyof Filters) => void;
  onGetCourses: (filters: string, masters?: string[]) => void;
  update: (courses: CourseData.DataWithLocale[]) => void;
}

const FilterType = {
  Year: 'Academic Year',
  Class: 'Class',
  None: ''
} as const;

type FilterType = (typeof FilterType)[keyof typeof FilterType];
type ClassYear = Exclude<FilterType, typeof FilterType.None>;

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onGetCourses, update }) => {
  /* Filter by Class or Year (selected type) */
  const [filterType, setFilterType] = React.useState<FilterType>(FilterType.None);
  /* Selected Class/Year */
  const [classYearFilter, setClassYearFilter] = React.useState<string>(filters.Year);
  /* All masters that is selected in the filter */
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);

  /* all masters available for selected programme and year */
  const [masters, setMasters] = React.useState<API.Masters[]>([]);
  /* Class/Year filter values */
  const [filterValues, setFilterValues] = React.useState<string[]>([]);

  /**
   * Set default value for class year filter to your class.
   * Reset class year filter when filter type is changed year
   * (as they year and class are two separate entities).
   */
  React.useEffect(() => {
    if (filters.Year && classYearFilter === '') {
      setClassYearFilter(filters.Year);
    }
  }, [filters.Year]);

  /**
   * Fetch all masters for selected programme and year
   * when both programme and year are selected
   */
  React.useEffect(() => {
    const { Programme, Year } = filters;

    if (Programme && Year) {
      const params = new URLSearchParams({ Programme, Year });
      GET<API.Masters[]>(Endpoints.masters, params).then(data => setMasters(data));
    }
  }, [filters]);

  const fetchFilterValues = async (filter: ClassYear) => {
    const urls = {
      [FilterType.Class]: Endpoints.classYears,
      [FilterType.Year]: Endpoints.academicYears
    };

    const data = await GET<string[]>(urls[filter]);
    setFilterValues(data);
  };

  const handleMasterFilter = (masters: string[]) => {
    const { Programme, Year } = filters;
    const body = { Programme, Year, MasterCodes: masters };

    POST<API.CourseData[]>(Endpoints.courses, body)
      .then(data => dataParser(data))
      .then(data => update(data));
  };

  const handleChangeMasters = (value: string[]) => {
    // If the user just selected the "select all" option
    if (value.includes('') && !multiSelectValue.includes('')) {
      const allMasters = masters.map(master => master.master_code);
      // Add all masters along with the "select all" option
      setMultiSelectValue([...allMasters, '']);
      handleMasterFilter(allMasters);
    }
    // If the user deselected the "select all" option
    else if (!value.includes('') && multiSelectValue.includes('')) {
      setMultiSelectValue([]);
      handleMasterFilter([]);
    }
    // Any other selection or deselection
    else {
      setMultiSelectValue(value);
      handleMasterFilter(value);
    }
  };

  const handleChangeFilterType = (value: FilterType) => {
    setFilterType(value);
    fetchFilterValues(value as ClassYear);

    // Reset class year filter when filter type is changed to year
    // as they are two separate entities
    if (filterType === FilterType.Year) {
      setClassYearFilter('');
    }
  };

  const hasProgramme = filters.Programme !== '';
  const hasYear = filters.Year !== '';
  const hasFilterBy = filterType !== '';

  const disableMasterSelection = !hasProgramme || !hasYear;
  const disableGetCourses = filters.Programme === '' || classYearFilter === '';

  const masterTooltip = !hasProgramme ? 'Please select a Programme' : 'Please select a Year';

  return (
    <>
      <Select value={filterType} label='Filter by' onChange={handleChangeFilterType}>
        <Option value='Class'>Class</Option>
        <Option value='Academic Year'>Academic Year</Option>
      </Select>

      <Tooltip text='Please select a filter' enabled={!hasFilterBy}>
        <Select
          enabled={hasFilterBy}
          label={filterType}
          value={classYearFilter}
          onChange={setClassYearFilter}
        >
          <Option value=''>Select</Option>
          {filterValues.map(filter => (
            <Option key={filter} value={filter}>
              {filter.replace('_', '/')}
            </Option>
          ))}
        </Select>
      </Tooltip>

      <Tooltip text={masterTooltip} enabled={disableMasterSelection}>
        <Select
          enabled={!disableMasterSelection}
          label='masters'
          multiple
          value={multiSelectValue}
          onChange={handleChangeMasters}
        >
          <Option value=''>All (Default)</Option>
          {masters.map(master => (
            <Option key={master.master_code} value={master.master_code}>
              {master.master_name_en}
            </Option>
          ))}
        </Select>
      </Tooltip>

      <StyledButtonWithIcon
        disabled={disableGetCourses}
        onClick={() => onGetCourses(classYearFilter, multiSelectValue)}
        text
        icon={<ReloadIcon width='0.7rem' />}
      >
        Get Courses
      </StyledButtonWithIcon>
    </>
  );
};
