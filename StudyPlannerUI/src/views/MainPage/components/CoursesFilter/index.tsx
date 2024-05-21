/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

// TODO: Check if this is needs refactoring
import React, { useEffect, useState } from 'react';
import {
  ClassYearFilter,
  FILTERS,
  FilterValue,
  getCoursesByProgramme,
  getFilterByValues
} from 'api/courses';
import { DEFAULT_LANG } from 'interfaces/constants';
import { Filters } from 'interfaces/Types';
import { dataParser } from 'utils/sortCourses';

import { ContainedButton } from 'components/Button/Buttons';
import { Select } from 'components/Select';
import Tooltip from 'components/Tooltip';

interface CoursesFilterProps {
  masters: API.Master[];
  filters: Filters;
  onFilterChange: (value: string, name: keyof Filters) => void;
  updateCourses: (courses: CourseData.DataWithLocale[]) => void;
}

const ALL_MASTERS = '';

export const CoursesFilter: React.FC<CoursesFilterProps> = ({
  masters,
  updateCourses,
  filters
}) => {
  useEffect(() => {
    setClassYearFilter(filters.year);
  }, [filters.year]);

  /* Filter by Class or Year (selected type) */
  const [filterType, setFilterType] = React.useState<FILTERS>(FILTERS.None);
  /* Selected Class/Year */
  const [classYearFilter, setClassYearFilter] = React.useState<string>(filters.year);
  /* All masters that is selected in the filter */
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  /* Class/Year filter values */
  const [filterValues, setFilterValues] = React.useState<string[]>([]);

  const fetchFilterValues = async (filter: ClassYearFilter) => {
    const data = await getFilterByValues(filter);
    setFilterValues(data.reverse());
  };

  const fetchCourses = (filterYear: string, masters?: string[]) => {
    const filter = {
      programme: filters.programme,
      year: filterYear,
      masterCodes: masters
    };

    getCoursesByProgramme(filter).then(resp => {
      const parsedData = dataParser(resp, DEFAULT_LANG);
      updateCourses(parsedData);
    });
  };

  const applyMasterFilter = (masters: string[]) => {
    const body = { ...filters, masterCodes: masters };

    getCoursesByProgramme(body)
      .then(data => dataParser(data))
      .then(data => updateCourses(data));
  };

  const handleChangeMasters = (value: string[]) => {
    // If the user just selected the "select all" option
    if (value.includes(ALL_MASTERS) && !multiSelectValue.includes(ALL_MASTERS)) {
      const allMasters = masters.map(master => master.masterCode);
      // Add all masters along with the "select all" option
      setMultiSelectValue([...allMasters, ALL_MASTERS]);
      applyMasterFilter(allMasters);
    }
    // If the user deselected the "select all" option
    else if (!value.includes(ALL_MASTERS) && multiSelectValue.includes(ALL_MASTERS)) {
      setMultiSelectValue([]);
      applyMasterFilter([]);
    }
    // Any other selection or deselection
    else {
      setMultiSelectValue(value);
      applyMasterFilter(value);
    }
  };

  const handleChangeFilterType = (filterType: FilterValue) => {
    // If the Filter by is set to Class, set the filter to selected programme class.
    if (filterType === FILTERS.Class) {
      setClassYearFilter(filters.year);
      // If the Filter by is set to Academic Year, reset the filter.
    } else {
      setClassYearFilter(FILTERS.None);
    }

    if (filterType !== FILTERS.None) {
      setFilterType(filterType);
      fetchFilterValues(filterType);
    }
  };

  const hasProgramme = filters.programme !== FILTERS.None;
  const hasYear = filters.year !== FILTERS.None;
  const hasFilterBy = filterType !== FILTERS.None;

  const disableMasterSelection = !hasProgramme || !hasYear;
  const disableGetCourses = !hasProgramme || !hasYear;

  const masterTooltip = !hasProgramme ? 'Please select a Programme' : 'Please select a Year';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fv = filterValues.map(f => {
    const filter = f.replace('_', '/');
    return {
      label: filter,
      value: filter
    };
  });

  return (
    <>
      <Select
        options={[
          { label: FILTERS.Class, value: FILTERS.Class },
          { label: FILTERS.Year, value: FILTERS.Year }
        ]}
        value={filterType}
        label='Filter by'
        onChange={handleChangeFilterType}
      ></Select>

      <Tooltip text='Please select a filter' enabled={!hasFilterBy}>
        <Select
          options={filterValues.map(f => {
            const filter = f.replace('_', '/');
            return {
              label: filter,
              value: filter
            };
          })}
          enabled={hasFilterBy}
          placeholder={`Select ${filterType}`}
          label={filterType}
          value={classYearFilter}
          onChange={setClassYearFilter}
        />
      </Tooltip>

      <Tooltip text={masterTooltip} enabled={disableMasterSelection}>
        <Select
          options={masters.map(master => {
            return {
              label: master.masterName_en,
              value: master.masterCode
            };
          })}
          enabled={!disableMasterSelection}
          placeholder='Select Masters'
          label='masters'
          multiple
          value={multiSelectValue}
          onChange={handleChangeMasters}
        />
      </Tooltip>

      <ContainedButton
        variant='primary'
        disabled={disableGetCourses}
        onClick={() => fetchCourses(classYearFilter, multiSelectValue)}
      >
        Get Courses
      </ContainedButton>
    </>
  );
};
