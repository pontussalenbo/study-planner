import { StyledButton } from 'components/Button';
import { Label } from 'components/Select/style';
import { InputHTMLAttributes } from 'react';
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
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
  max-width: 100%;
  flex-wrap: wrap;
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  align-items: flex-end;
  gap: 1rem;
  display: flex;
  margin-bottom: 20px;
`;

export const SearchInputWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

interface SearchInputProps {
  error?: boolean;
}

export const SearchInput = styled.input<SearchInputProps>`
  margin-top: 10px;
  width: ${({ placeholder }) => (placeholder ? `${placeholder.length + 3}ch` : '100%')};
  outline: ${({ error, theme }) => (error ? '1px solid red' : `2px solid ${theme.secondary}`)}};


  @media (max-width: 768px) {
    width: 100%;
  }
  
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: none;
    outline: 2px solid ${({ error, theme }) => (error ? 'red' : theme.button)};
  }

  border-radius: 4px;
  height: 30px;
  padding: 13px 10px;
`;

export const SearchError = styled.span`
  position: absolute;
  top: 35px;
  right: 10px;
  color: red;
  font-size: 10px;
  font-weight: 600;
  font-style: italic;
`;

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  showError?: boolean;
  children?: React.ReactNode;
}

export const InputWithLabel = ({ label, placeholder, showError, children, ...rest }: InputWithLabelProps) => {
  return (
    <SearchBarContainer>
      <SearchInputWrapper>
        <Label htmlFor='searchBar'>{label}</Label>
        <SearchInput {...rest} id='searchBar' error={showError} type='text' placeholder={placeholder} />
        {showError && children}
      </SearchInputWrapper>
    </SearchBarContainer>
  );
};
