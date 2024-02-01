/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

// StyledComponents.ts
import styled, { css } from 'styled-components';

interface Openable {
  isOpen?: boolean;
}

export const StyledFormControl = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledLabel = styled.label<Openable>`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 14px;
  font-size: 1rem;
  transform-origin: top left;
  transform: translate(14px, 20px) scale(1);
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  pointer-events: none;
  ${props => props.isOpen && 'display: none;'}
`;

interface Disabled {
  disabled?: boolean;
}

export const StyledSelect = styled.select<Disabled & Openable>`
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.onSurfaceVariant};
  width: 100%;
  padding: 10px 6px;
  padding-right: 30px;
  // border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  -webkit-appearance: none; // Hides default browser arrow in WebKit browsers
  -moz-appearance: none; // Hides default browser arrow in Firefox
  appearance: none; // Standard way to hide the arrow
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.7;
    pointer-events: none;
  `}
  &:focus-visible {
    outline: none;
  }

  &:focus + ${StyledLabel} {
    transform: translate(4px, -8px) scale(0.75);
    color: white;
  }
`;

export const StyledFieldset = styled.fieldset<Openable>`
  text-align: left;
  top: -5px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0 8px;
  overflow: hidden;
  position: absolute;
  border-style: solid;
  border-width: 2px;
  border-radius: 4px;
  pointer-events: none;
  border-color: ${Tokens.neutralVariant40};
  &:hover {
    ${({ isOpen, theme }) => !isOpen && `border-color: ${theme.outline}`};
  }
  ${({ isOpen, theme }) =>
    isOpen &&
    `
    border-color: ${theme.primary};
    `}
`;

export const StyledLegend = styled.legend<{ hasValue: boolean }>`
  width: auto;
  height: 11px;
  display: block;
  padding: 0;
  font-size: 0.75em;
  visibility: hidden;
  max-width: 0.01px;
  transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  max-width: ${({ hasValue }) => (hasValue ? '100%' : '0.01px')};
  ${StyledSelect}:focus + ${StyledLabel} + & {
    max-width: 1000px; // This expands the legend when the select is focused
    transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
    visibility: visible;
  }
`;

interface ArrowProps {
  isOpen: boolean;
}

export const StyledArrowIcon = styled.div<ArrowProps>`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%) rotate(45deg);
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transition: transform 0.3s;
  color: white;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translateY(-50%) rotate(225deg);
    `}
`;

export const LegendContent = styled.span`
  padding-left: 5px;
  padding-right: 5px;
  display: inline-flex;
  color: white;
  visibility: visible;
  opacity: 0;
`;

// Select.tsx
import React, { useState } from 'react';
import { Tokens } from 'style/tokens';
interface SelectProps {
  options: { value: string; label: string }[];
  label: string;
  enabled?: boolean;
}

const MuiSelect: React.FC<SelectProps> = ({ options, label, enabled = true }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setIsOpen(false);
  };

  return (
    <StyledFormControl>
      <StyledSelect
        disabled={!enabled}
        defaultValue=''
        onChange={handleSelectChange}
        onFocus={toggleOpen}
        onBlur={() => setIsOpen(false)}
      >
        <option value='' disabled>
          Select
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <StyledLabel>{selectedValue ? '' : label}</StyledLabel>
      <StyledFieldset isOpen={isOpen}>
        <StyledLegend hasValue={selectedValue !== '' || isOpen}>
          <LegendContent>{label}</LegendContent>
        </StyledLegend>
      </StyledFieldset>
      <StyledArrowIcon isOpen={isOpen} />
    </StyledFormControl>
  );
};

export default MuiSelect;

// MultiSelect.tsx
interface MultiSelectProps {
  options: { value: string; label: string }[];
  label: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({ options, label }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (value: string) => {
    setSelectedValues(prev =>
      prev.includes(value) ? prev.filter(val => val !== value) : [...prev, value]
    );
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return label;
    if (selectedValues.length === 1)
      return options.find(opt => opt.value === selectedValues[0])?.label || '';
    return `${selectedValues.length} options selected`;
  };

  return (
    <StyledFormControl onClick={() => setIsOpen(!isOpen)}>
      <StyledLabel>{getDisplayText()}</StyledLabel>
      <StyledFieldset>
        <StyledLegend hasValue={selectedValues.length !== 0}>{label}</StyledLegend>
        {isOpen && (
          <StyledDropdown>
            {options.map(option => (
              <StyledCheckboxOption key={option.value}>
                <input
                  type='checkbox'
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                />
                {option.label}
              </StyledCheckboxOption>
            ))}
          </StyledDropdown>
        )}
      </StyledFieldset>
    </StyledFormControl>
  );
};

// StyledComponents.ts
// ... (Other styled components remain the same)

export const StyledDropdown = styled.div`
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-top: none;
  z-index: 100;
  box-sizing: border-box;
  max-height: 200px;
  overflow-y: auto;
`;

export const StyledCheckboxOption = styled.label`
  display: block;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background-color: #f5f5f5;
  }

  input {
    margin-right: 8px;
  }
`;
