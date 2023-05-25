import { Select } from 'components/Select';
import { Filters, TransformFn } from 'interfaces/Types';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { GET, POST } from 'utils/fetch';
import { dataParser } from 'views/MainPage/dataParser';
import {
  SearchBarContainer,
  SearchError,
  SearchInput,
  SearchInputWrapper
} from './style';
import { Endpoints } from 'interfaces/API_Constants.d';
import { useMemo } from 'react';

interface SearchBarProps {
  matches: boolean;
  filter: (transformFn: TransformFn) => void | Promise<void>;
  filters: Filters;
  update: (newCourses: CourseData.DataWithLocale[]) => void;
}

// Your component
const SearchBar: React.FC<SearchBarProps> = ({
  matches,
  filters,
  filter,
  update
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [masters, setMasters] = useState<API.Masters[]>([]);

  useEffect(() => {
    const { Programme, Year } = filters;
    if (!Programme || !Year) {
      return;
    }
    const params = new URLSearchParams({ Programme, Year });
    GET(Endpoints.masters, params).then(data => setMasters(data));
  }, [filters]);

  const shouldError = useMemo(() => !matches && query.length > 0, [matches, query]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    handleFilter(event.target.value);
  };

  const handleMasterChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
    // TODO: replace with real filter
    const body = { Programme: 'D', Year: 'H19', Master: master || undefined };
    POST(Endpoints.courses, body)
      .then(data => dataParser(data, 'course_name_en'))
      .then(data => update(data));
  };

  return (
    <SearchBarContainer>
      <SearchInputWrapper>
        <SearchInput
          error={shouldError}
          type='text'
          onChange={handleSearchChange}
          placeholder={'Search Course name or code'}
        ></SearchInput>
        {shouldError && <SearchError>no matches</SearchError>}
      </SearchInputWrapper>
      <Select defaultValue='' label='By Master' onChange={handleMasterChange}>
        <option value=''>All (Default)</option>
        {masters.map(master => (
          <option key={master.master_code} value={master.master_code}>
            {master.master_name_en}
          </option>
        ))}
      </Select>
    </SearchBarContainer>
  );
};

export default SearchBar;
