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

interface SearchInputProps {
  error: boolean;
}

export const SearchInput = styled.input<SearchInputProps>`
  outline: ${({ error, theme }) =>
    error ? '1px solid red' : `1px solid ${theme.primary}`}};

  border: ${({ error, theme }) =>
    error ? '1px solid red' : `1px solid ${theme.primary}`}};
  border-radius: 4px;
  width: 330px;
  height: 30px;
  padding: 5px;
`;
