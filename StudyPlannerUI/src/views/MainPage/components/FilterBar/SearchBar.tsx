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
