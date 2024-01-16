/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useState, ReactNode, useContext, useEffect, useRef, FC } from 'react';
import {
  Arrow,
  Checkbox,
  DropdownList,
  LegendContent,
  OptionItem,
  Pill,
  RemoveIcon,
  SelectContainer,
  SelectLabel,
  StyledFieldset,
  StyledLegend
} from './style';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SelectContextType<T = any> {
  selectValue: T;
  setSelectValue: (value: T) => void;
  multiple: boolean;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

interface SelectedItemProps {
  label: string;
  onRemove: () => void;
}

export const SelectedItem: FC<SelectedItemProps> = ({ label, onRemove }) => {
  return (
    <Pill onClick={onRemove}>
      {label}
      <RemoveIcon>U+00d7</RemoveIcon>
    </Pill>
  );
};

interface OptionProps {
  value: string;
  children: ReactNode;
}

export const Option: React.FC<OptionProps> = ({ value, children }) => {
  const { selectValue, setSelectValue, multiple } = useContext(SelectContext) as SelectContextType;

  const handleClick = () => {
    if (multiple) {
      const valuesArray = selectValue as string[];
      if (valuesArray.includes(value)) {
        setSelectValue(valuesArray.filter(v => v !== value));
      } else {
        setSelectValue([...valuesArray, value]);
      }
    } else {
      setSelectValue(value);
    }
  };

  const isSelected = multiple ? (selectValue as string[]).includes(value) : selectValue === value;

  return (
    <OptionItem data-value={value} onClick={handleClick}>
      {multiple && <Checkbox type='checkbox' checked={isSelected} readOnly />}
      {children}
    </OptionItem>
  );
};

interface CommonProps {
  children?: ReactNode;
  pills?: boolean;
  label: string;
  enabled?: boolean;
  placeholder?: string;
}

type Value = string | number | readonly string[] | readonly number[] | undefined;

type SelectProps<T extends boolean, S extends Value> = CommonProps & {
  multiple?: T;
  value: S;
  defaultValue?: S;
  onChange: (value: S) => void;
};

export const Select = <T extends boolean, S extends Value>({
  children,
  multiple,
  pills = false,
  placeholder,
  value,
  label,
  enabled = true,
  onChange
}: SelectProps<T, S>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleContainerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    if (multiple) {
      e.stopPropagation(); // Stops the click event from reaching the SelectContainer
    }
  };

  const selectedValues = Array.isArray(value) ? value.join(', ') : value;
  const hasValue = Array.isArray(value) ? value.length > 0 : value !== '';

  return (
    <SelectContainer
      disabled={!enabled}
      isOpen={isOpen}
      ref={selectRef}
      onClick={handleContainerClick}
    >
      <SelectLabel isOpen={isOpen}>{selectedValues || placeholder || label}</SelectLabel>
      {Array.isArray(value) && pills && (
        <div>
          {value.map(item => (
            // TODO: implement onRemove
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <SelectedItem key={item} label={item.toString()} onRemove={() => {}} />
          ))}
        </div>
      )}
      <Arrow isOpen={isOpen}>&#x25BC;</Arrow>
      <DropdownList data-visible={isOpen} onClick={handleDropdownClick}>
        <SelectContext.Provider
          value={{ selectValue: value, setSelectValue: onChange, multiple: multiple || false }}
        >
          {children}
        </SelectContext.Provider>
      </DropdownList>
      <StyledFieldset isOpen={isOpen}>
        <StyledLegend hasValue={hasValue || isOpen}>
          <LegendContent>{label}</LegendContent>
        </StyledLegend>
      </StyledFieldset>
    </SelectContainer>
  );
};
