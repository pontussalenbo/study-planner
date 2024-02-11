/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { InputHTMLAttributes } from 'react';

import { Label } from 'components/Select/style';

import { SearchBarContainer, SearchInput, SearchInputWrapper } from './style';

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
