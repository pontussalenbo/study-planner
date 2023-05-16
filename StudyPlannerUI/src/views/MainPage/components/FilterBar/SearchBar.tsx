import { Select } from 'components/Select';
import { TransformFn } from 'interfaces/TransformFn';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BASE_URL } from 'utils/URL';
import { GET } from 'utils/fetch';
import { dataParser } from 'views/MainPage/dataParser';

// Define your styled components
const SearchBarContainer = styled.div`
  align-items: flex-end;
  gap: 1rem;
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

interface IMaster {
  master_code: string;
  master_name_en: string;
  master_name_sv: string;
}

interface SearchBarProps {
  setSearch?: (search: string) => void;
  matches: boolean;
  filter: (transformFn: TransformFn) => void | Promise<void>;
}

// Your component
const SearchBar: React.FC<SearchBarProps> = ({ matches, filter }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [masters, setMasters] = useState<IMaster[]>([]);

  useEffect(() => {
    //TODO: replace with real filter
    const params = new URLSearchParams({ Programme: 'D', Year: 'H19' });
    GET('/general/masters', params).then(data => setMasters(data));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    handleFilter(event.target.value);
  };

  const handleMasterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleMasterFilter(event.target.value);
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
      const response = await fetch(BASE_URL + '/courses', {
        body: JSON.stringify({ Programme: 'D', Year: 'H19', Master: master }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return dataParser(data, 'course_name_en');
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
      <Select defaultValue='' label='By Master' onChange={handleMasterChange}>
        <option value='' disabled>
          Select (Optional)
        </option>
        {masters.map(master => (
          <option key={master.master_code} value={master.master_code}>
            {master.master_code}
          </option>
        ))}
      </Select>
    </SearchBarContainer>
  );
};

export default SearchBar;
