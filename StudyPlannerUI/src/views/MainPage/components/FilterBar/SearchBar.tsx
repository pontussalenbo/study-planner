import { Select } from 'components/Select';
import { TransformFn } from 'interfaces/TransformFn';
import React, { useEffect, useState } from 'react';
import { GET, POST } from 'utils/fetch';
import { dataParser } from 'views/MainPage/dataParser';
import { SearchBarContainer, SearchInput } from './style';

interface SearchBarProps {
  matches: boolean;
  setSearch?: (search: string) => void;
  filter: (transformFn: TransformFn) => void | Promise<void>;
}

// Your component
const SearchBar: React.FC<SearchBarProps> = ({ matches, filter }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [masters, setMasters] = useState<API.Masters[]>([]);

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
