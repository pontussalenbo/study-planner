import { Label } from 'components/Select/style';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  width: 100%;
  align-items: flex-end;
  gap: 1rem;
  display: flex;
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
  width: 300px;
  border-width: 0px;
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.onSurfaceVariant};
  @media (max-width: 768px) {
    width: 100%;
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.shadow};
    outline: 1px solid ${({ error, theme }) => (error ? theme.error : theme.surfaceTint)};
  }

  caret-color: ${({ theme }) => theme.surfaceTint};

  border-radius: 4px;
  height: 30px;
  padding: 13px 10px;
`;

export const SearchError = styled.span`
  position: absolute;
  top: 35px;
  right: 10px;
  color: ${({ theme }) => theme.error};
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

export const InputWithLabel = ({
  label,
  placeholder,
  showError,
  children,
  ...rest
}: InputWithLabelProps) => {
  return (
    <SearchBarContainer>
      <SearchInputWrapper>
        <Label htmlFor='searchBar'>{label}</Label>
        <SearchInput
          {...rest}
          id='searchBar'
          error={showError}
          type='text'
          placeholder={placeholder}
        />
        {showError && children}
      </SearchInputWrapper>
    </SearchBarContainer>
  );
};
