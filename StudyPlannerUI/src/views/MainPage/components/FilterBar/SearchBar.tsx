import React, { useState } from 'react';
import styled from 'styled-components';

// Define your styled components
const SearchBarContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

interface SearchInputProps {
  error: boolean;
}

const SearchInput = styled.input<SearchInputProps>`
  outline: ${({ error, theme }) =>
    error ? '1px solid red' : `1px solid ${theme.primary}`}};

  border: ${({ error, theme }) =>
    error ? '1px solid red' : `1px solid ${theme.primary}`}};
  border-radius: 4px;
  width: 330px;
  height: 30px;
  padding: 5px;
`;

interface SearchBarProps {
  setSearch: (search: string) => void;
  matches: boolean;
}

// Your component
const SearchBar: React.FC<SearchBarProps> = ({ setSearch, matches }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearch(event.target.value);
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

  const handleMasterFilter = (master: string) => {
    // Define your transformation function here
    const transformFn = async () => {
      const body = { Programme: 'D', Year: 'H19', Master: master };
      return POST('/courses', body).then(data => dataParser(data, 'course_name_en'));
    };
    filter(transformFn);
  };
  return (
    <SearchBarContainer>
      <SearchInput
        error={!matches && query.length > 0}
        type='text'
        onChange={handleSearchChange}
        placeholder='Search Course name or code'
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
