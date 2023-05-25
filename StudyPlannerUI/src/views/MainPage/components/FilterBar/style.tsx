import { StyledButton } from 'components/Button';
import styled from 'styled-components';

export const GetButton = styled(StyledButton)`
  height: max-content;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: auto;
  margin-left: auto;
`;

export const SelectWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  max-width: 100%;
  flex-wrap: wrap;
`;

export const SearchBarContainer = styled.div`
  align-items: flex-end;
  gap: 1rem;
  display: flex;
  margin-bottom: 20px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
`;

interface SearchInputProps {
  error: boolean;
}

export const SearchInput = styled.input<SearchInputProps>`
  min-width: 250px;
  width: auto;
  outline: ${({ error, theme }) =>
    error ? '1px solid red' : `2px solid ${theme.secondary}`}};

  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: none;
    outline: 2px solid ${({ error, theme }) => (error ? 'red' : theme.button)};
  }

  border-radius: 4px;
  height: 30px;
  padding: 10px;
`;

export const SearchError = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: red;
  font-size: 10px;
  font-weight: 600;
  font-style: italic;
`;
