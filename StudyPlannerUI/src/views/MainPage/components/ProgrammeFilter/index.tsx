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

import React from 'react';
import { Select, Option } from 'components/Select';
import { Filters } from 'interfaces/Types';

interface ProgrammeFilterProps {
  filters: Filters;
  onFilterChange: (value: string, name: keyof Filters) => void;
  programmes?: string[];
  years?: string[];
}

const ProgrammeFilter: React.FC<ProgrammeFilterProps> = ({
  onFilterChange,
  filters,
  programmes,
  years
}) => {
  const handleProgrammeChange = (value: string) => {
    onFilterChange(value, 'programme');
  };

  const handleYearChange = (value: string) => {
    onFilterChange(value, 'year');
  };

  function reverse(arr: string[] = []): string[] {
    return arr.sort((a, b) => {
      // For strings starting with 'H'
      if (a.startsWith('H') && b.startsWith('H')) {
        return parseInt(b.substring(1)) - parseInt(a.substring(1));
      }

      // For strings with '/'
      if (a.includes('/') && b.includes('/')) {
        const aValue = parseInt(a.split('/')[0]);
        const bValue = parseInt(b.split('/')[0]);
        return bValue - aValue;
      }

      // Default sort (though the provided patterns should cover all cases)
      return a.localeCompare(b);
    });
  }
  return (
    <>
      <Select
        value={filters.programme}
        placeholder='Select Programme'
        label='Programme'
        onChange={handleProgrammeChange}
      >
        <Option value=''>Select</Option>
        {programmes?.map(programme => (
          <Option key={programme} value={programme}>
            {programme}
          </Option>
        ))}
      </Select>
      <Select
        value={filters.year}
        placeholder='Select Class'
        label='Class'
        onChange={handleYearChange}
      >
        <Option value=''>Select</Option>
        {reverse(years)?.map(year => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default ProgrammeFilter;
