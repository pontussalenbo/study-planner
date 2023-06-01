import { Select } from 'components/Select';
import { Filters, TransformFn } from 'interfaces/Types';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { GET, POST } from 'utils/fetch';
import { dataParser } from 'views/MainPage/dataParser';
import { InputWithLabel, SearchBarContainer, SearchError, SearchInput, SearchInputWrapper } from './style';
import { Endpoints } from 'interfaces/API_Constants.d';
import { useMemo } from 'react';
import styled from 'styled-components';
import { breakpoints } from 'utils/breakpoints';

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
    const transformFn = (courses: CourseData.DataWithLocale[]) => {
      return courses.filter(
        course =>
          course.course_name.toLowerCase().includes(query.toLowerCase()) ||
          course.course_code.toLowerCase().includes(query.toLowerCase())
      );
    };
    filter(transformFn);
  };

  return (
    <InputWithLabel
      onChange={handleSearchChange}
      showError={shouldError}
      label='Search courses'
      placeholder='course name or code'
    >
      <SearchError>no matches</SearchError>
    </InputWithLabel>
  );
};

export default SearchBar;
