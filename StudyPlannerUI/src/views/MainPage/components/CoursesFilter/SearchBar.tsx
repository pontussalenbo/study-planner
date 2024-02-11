/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { ChangeEvent, useMemo, useState } from 'react';
import { TransformFn } from 'interfaces/Types';

import { InputWithLabel } from './Input';
import { SearchError } from './style';

interface SearchBarProps {
  courses: CourseData.DataWithLocale[];
  setFilteredCourses: React.Dispatch<React.SetStateAction<CourseData.DataWithLocale[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ courses, setFilteredCourses }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState(false);
  const shouldError = useMemo(() => !matches && query.length > 0, [matches, query]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    handleFilter(event.target.value);
  };

  const filterCourses = (transformFn: TransformFn) => {
    const result = transformFn([...courses]);

    // If result is a Promise, handle it
    Promise.resolve(result).then(results => {
      const hasMatches = results.length > 0;
      const newCourses = hasMatches ? results : courses;
      setFilteredCourses(newCourses);
      setMatches(hasMatches);
    });
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
    filterCourses(transformFn);
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
