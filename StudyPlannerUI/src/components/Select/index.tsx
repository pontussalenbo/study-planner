/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { FC, ReactNode, useContext, useEffect, useRef, useState } from 'react';

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

export const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

export function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
}

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

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  children: ReactNode;
  focused?: boolean;
}

// eslint-disable-next-line react/display-name
export const Option = React.forwardRef<HTMLLIElement, OptionProps>(
  ({ value, children, focused }, ref) => {
    const { selectValue, setSelectValue, multiple } = useContext(
      SelectContext
    ) as SelectContextType;

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
      <OptionItem
        focused={focused}
        ref={ref}
        role='option'
        data-value={value}
        onClick={handleClick}
      >
        {multiple && <Checkbox type='checkbox' checked={isSelected} readOnly />}
        {children}
      </OptionItem>
    );
  }
);

interface CommonProps {
  children?: ReactNode;
  pills?: boolean;
  label: string;
  enabled?: boolean;
  placeholder?: string;
}

type Value = string | number | readonly string[] | readonly number[] | undefined;

type SelectProps<T extends boolean, S extends Value> = CommonProps & {
  options: { value: string; label: string }[];
  multiple?: T;
  value: S;
  defaultValue?: S;
  onChange: (value: S) => void;
};

export const Select = <T extends boolean, S extends Value>({
  options,
  multiple,
  placeholder,
  value,
  label,
  enabled = true,
  onChange
}: SelectProps<T, S>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();

      if (!isOpen) {
        setIsOpen(true);
      } else {
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = (focusedOptionIndex + direction + options.length) % options.length;
        setFocusedOptionIndex(nextIndex);
        optionsRef.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
      if (isOpen && optionsRef.current[focusedOptionIndex]) {
        optionsRef.current[focusedOptionIndex]?.click();
        setIsOpen(false);
      }
    }
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const selectedValues = Array.isArray(value) ? value.join(', ') : value;
  const hasValue = Array.isArray(value) ? value.length > 0 : value !== '';

  return (
    <SelectContainer
      disabled={!enabled}
      isOpen={isOpen}
      ref={selectRef}
      aria-haspopup='listbox'
      onKeyDown={handleKeyDown}
      onClick={handleContainerClick}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      role='combobox'
      tabIndex={0}
    >
      <SelectLabel isOpen={isOpen}>{selectedValues || placeholder || label}</SelectLabel>
      <Arrow isOpen={isOpen}>&#x25BC;</Arrow>
      <DropdownList
        role='listbox'
        tabIndex={-1}
        data-visible={isOpen}
        onClick={handleDropdownClick}
      >
        <SelectContext.Provider
          value={{ selectValue: value, setSelectValue: onChange, multiple: !!multiple }}
        >
          {options?.map((option, index) => (
            <Option
              key={option.label}
              ref={el => (optionsRef.current[index] = el)}
              value={option.value?.toString() || option.label}
              focused={focusedOptionIndex === index}
            >
              {option.label}
            </Option>
          ))}
        </SelectContext.Provider>
      </DropdownList>
      <StyledFieldset focused={focused} isOpen={isOpen}>
        <StyledLegend hasValue={hasValue || isOpen}>
          <LegendContent>{label}</LegendContent>
        </StyledLegend>
      </StyledFieldset>
    </SelectContainer>
  );
};
