import React, { FC, useState } from 'react';
import styled from 'styled-components';

// Define your styled components
const SearchBarContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 330px;
  height: 30px;
  padding: 5px;
`;

// Define the types of your state
interface SearchState {
  searchTerm: string;
}

// Your component
const SearchBar: FC = () => {
  const [search, setSearch] = useState<SearchState>({ searchTerm: '' });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ searchTerm: event.target.value });
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(search.searchTerm); // Replace this with your search logic
  };

  return (
    <SearchBarContainer>
      <form onSubmit={handleSearchSubmit}>
        <SearchInput
          type='text'
          value={search.searchTerm}
          onChange={handleSearchChange}
          placeholder='Search Course name or code...'
        />
      </form>
    </SearchBarContainer>
  );
};

export default SearchBar;
