/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { TransformFn } from 'interfaces/Types';
import React, { ChangeEvent, useState } from 'react';
import { InputWithLabel, SearchError } from './style';
import { useMemo } from 'react';

interface SearchBarProps {
  matches: boolean;
  filter: (transformFn: TransformFn) => void | Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({ matches, filter }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const shouldError = useMemo(() => !matches && query.length > 0, [matches, query]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    handleFilter(event.target.value);
  };

  const handleFilter = (query: string) => {
    const search = query.toLowerCase();
    const transformFn = (courses: CourseData.DataWithLocale[]) => {
      return courses.filter(
        course =>
          course.courseName.toLowerCase().includes(search) ||
          // Support for search in other language (en/sv)
          course.courseName_other?.toLowerCase().includes(search) ||
          course.courseCode.toLowerCase().includes(search)
      );
    };
    filter(transformFn);
  };

  return (
    <InputWithLabel
      onChange={handleSearchChange}
      showError={shouldError}
      label='Find courses'
      placeholder='course name or code'
    >
      <SearchError>no matches</SearchError>
    </InputWithLabel>
  );
};

export default SearchBar;
