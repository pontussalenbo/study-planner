/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { ChangeEvent, useState } from 'react';

import { FlexContainer } from 'components/Layout';
import { LegendContent, SelectLabel, StyledFieldset, StyledLegend } from 'components/Select/style';

import { InputContainer, SearchInput } from './styles';

interface CommonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMsg?: string;
}

type EditableInputProps = CommonProps & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: false;
};

type ReadOnlyInputProps = CommonProps & {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: true;
};

type FormInputProps = EditableInputProps | ReadOnlyInputProps;

// TODO: make onchange optional if readonly

export const FormInput: React.FC<FormInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  errorMsg,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState<boolean>(!!value);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    setHasValue(!!e.target.value);
  };

  return (
    <FlexContainer direction='column' gap='5px' width='100%'>
      <InputContainer isOpen={isFocused} disabled={false}>
        <SelectLabel isOpen={isFocused || hasValue}>{placeholder || label}</SelectLabel>
        <StyledFieldset error={!!errorMsg} isOpen={isFocused}>
          <StyledLegend hasValue={hasValue || isFocused}>
            <LegendContent>{label}</LegendContent>
          </StyledLegend>
          <SearchInput
            {...rest}
            value={value || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </StyledFieldset>
      </InputContainer>
      <span>{errorMsg}</span>
    </FlexContainer>
  );
};
