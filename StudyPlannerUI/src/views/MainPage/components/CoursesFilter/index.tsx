/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useEffect, useState } from 'react';
import Tooltip from 'components/Tooltip';
import { Filters } from 'interfaces/Types';
import IconButton from 'components/Button/Button';
import { dataParser } from 'utils/sortCourses';
import { Option, Select } from 'components/Select';
import ReloadIcon from 'components/Icons/Reload';
import {
  ClassYearFilter,
  FILTERS,
  FilterValue,
  getCoursesByProgramme,
  getFilterByValues
} from 'api/courses';

interface CoursesFilterProps {
  masters: API.Master[];
  filters: Filters;
  onFilterChange: (value: string, name: keyof Filters) => void;
  onGetCourses: (filters: string, masters?: string[]) => void;
  update: (courses: CourseData.DataWithLocale[]) => void;
}

const ALL_MASTERS = '';

export const CoursesFilter: React.FC<CoursesFilterProps> = ({
  masters,
  onGetCourses,
  update,
  filters
}) => {
  /* Filter by Class or Year (selected type) */
  const [filterType, setFilterType] = React.useState<FILTERS>(FILTERS.None);
  /* Selected Class/Year */
  const [classYearFilter, setClassYearFilter] = React.useState<string>(filters.year);
  /* All masters that is selected in the filter */
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);

  /* Class/Year filter values */
  const [filterValues, setFilterValues] = React.useState<string[]>([]);

  useEffect(() => {
    // Check if filters.Year has value and classYearFilter does not have a value
    if (filters.year && !classYearFilter) {
      setClassYearFilter(filters.year);
    }
  }, [filters.year]);

  const fetchFilterValues = async (filter: ClassYearFilter) => {
    const data = await getFilterByValues(filter);
    setFilterValues(data.reverse());
  };

  const handleMasterFilter = (masters: string[]) => {
    const body = { ...filters, masterCodes: masters };

    getCoursesByProgramme(body)
      .then(data => dataParser(data))
      .then(data => update(data));
  };

  const handleChangeMasters = (value: string[]) => {
    // If the user just selected the "select all" option
    if (value.includes(ALL_MASTERS) && !multiSelectValue.includes(ALL_MASTERS)) {
      const allMasters = masters.map(master => master.masterCode);
      // Add all masters along with the "select all" option
      setMultiSelectValue([...allMasters, ALL_MASTERS]);
      handleMasterFilter(allMasters);
    }
    // If the user deselected the "select all" option
    else if (!value.includes(ALL_MASTERS) && multiSelectValue.includes(ALL_MASTERS)) {
      setMultiSelectValue([]);
      handleMasterFilter([]);
    }
    // Any other selection or deselection
    else {
      setMultiSelectValue(value);
      handleMasterFilter(value);
    }
  };

  const handleChangeFilterType = (value: FilterValue) => {
    if (value === FILTERS.None) {
      return;
    }
    setFilterType(value);
    fetchFilterValues(value);

    // Reset class year filter when filter type is changed to year
    // as they are two separate entities
    if (value === FILTERS.Year) {
      setClassYearFilter(FILTERS.None);
    }
  };

  const hasProgramme = filters.programme !== FILTERS.None;
  const hasYear = filters.year !== FILTERS.None;
  const hasFilterBy = filterType !== FILTERS.None;

  const disableMasterSelection = !hasProgramme || !hasYear;
  const disableGetCourses = !hasProgramme || !hasYear;

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
          placeholder={`Select ${filterType}`}
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
          placeholder='Select Masters'
          label='masters'
          multiple
          value={multiSelectValue}
          onChange={handleChangeMasters}
        >
          <Option value=''>All (Default)</Option>
          {masters.map(master => (
            <Option key={master.masterCode} value={master.masterCode}>
              {master.masterName_en}
            </Option>
          ))}
        </Select>
      </Tooltip>

      <IconButton
        disabled={disableGetCourses}
        onClick={() => onGetCourses(classYearFilter, multiSelectValue)}
        text
        icon={<ReloadIcon width='0.7rem' />}
      >
        Get Courses
      </IconButton>
    </>
  );
};
