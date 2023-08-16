import React, { useState, ReactNode, useContext, useEffect, useRef, FC } from 'react';
import styled from 'styled-components';
import { Select as StyledSelect, Label, SelectWrapper, OptionalText } from './style';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  optional?: boolean;
  options?: string[];
  children?: React.ReactNode;
  width?: string;
}

export function Select({ label, options, optional, children, ...props }: Props) {
  const id = props.name + '_' + label;
  return (
    <SelectWrapper>
      <Label htmlFor={id}>
        {label} {optional && <OptionalText>(optional)</OptionalText>}
      </Label>
      <StyledSelect id={id} {...props}>
        {children}
        {options?.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
}

interface SelectContextType<T = string | string[]> {
  selectValue: T;
  setSelectValue: (value: any) => void;
  multiple: boolean;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

// Styles
const SelectContainer = styled.div<{ isOpen: boolean; disabled: boolean }>`
  display: flex;
  min-height: 38px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.onSurfaceVariant};
  border-radius: 4px;
  width: 200px;
  position: relative;
  font-family: 'Roboto', sans-serif;
  padding: 0;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

const Arrow = styled.span<{ isOpen: boolean }>`
  margin-right: 8px;
  margin-left: auto;
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
  font-size: 0.7rem;
`;

const DropdownList = styled.ul`
  position: absolute;
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.onSurfaceVariant};
  top: calc(100% + 1px); // Offset to move beyond the border.
  left: 0px; // Adjust based on left padding of the SelectContainer.
  width: 100%; // Increase width to account for the paddings.
  border: 1px solid ${({ theme }) => theme.outline};
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-height: 250px;
  overflow-y: auto;
  transition: all 0.3s ease;

  /* Animation styles */
  visibility: hidden;
  transition: opacity 0.3s linear;

  &[data-visible='true'] {
    visibility: visible;
  }
`;

const OptionItem = styled.li`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.primary};
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #3498db;
  color: white;
  border-radius: 16px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
`;

const RemoveIcon = styled.span`
  margin-left: 8px;
`;

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
  const { selectValue, setSelectValue, multiple } = useContext(SelectContext) as any;

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

const StyledFieldset = styled.fieldset`
  text-align: left;
  position: absolute;
  bottom: 0;
  right: 0;
  top: -5px;
  left: 0;
  margin: 0;
  padding: 0 8px;
  pointer-events: none;
  border-radius: inherit;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  min-width: 0%;
  border-width: 2px;
  border-color: ${({ theme }) => theme.outline};
`;

const StyledLegend = styled.legend<{ hasValue: boolean }>`
  float: unset;
  width: auto;
  overflow: hidden;
  display: block;
  padding: 0;
  height: 1em;
  font-size: 0.8em;
  visibility: hidden;
  max-width: ${({ hasValue }) => (hasValue ? '100%' : '0.01px')};
  -webkit-transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  white-space: nowrap;
`;

const LegendContent = styled.span`
  padding-left: 5px;
  padding-right: 5px;
  display: inline-flex;
  color: white;
  visibility: visible;
  opacity: 1;
`;

const SelectLabel = styled.label<{ isOpen: boolean }>`
  display: block;
  margin: 1rem;
  // move the label up when the select is open
  transform: ${props => (props.isOpen ? 'translateY(-18px)' : 'translateY(-1px)')};
  transition: transform 0.3s ease;
  font-size: 0.85rem;
  visibility: ${props => (props.isOpen ? 'hidden' : 'visible')};
`;

interface CommonProps {
  children: ReactNode;
  pills?: boolean;
  label: string;
  enabled?: boolean;
}

type SelectProps<T extends boolean> = CommonProps & {
  multiple?: T;
  value: T extends true ? string[] : string;
  defaultValue?: T extends true ? string[] : string;
  onChange: ((value: any) => void) | ((value: any[]) => void);
};

export const MultiSelect = <T extends boolean>({
  children,
  multiple,
  pills = false,
  value,
  defaultValue,
  label,
  enabled = true,
  onChange
}: SelectProps<T>) => {
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

  return (
    <SelectContainer disabled={!enabled} isOpen={isOpen} ref={selectRef} onClick={handleContainerClick}>
      <SelectLabel isOpen={isOpen}>{selectedValues || label}</SelectLabel>
      {Array.isArray(value) && pills && (
        <div>
          {value.map(item => (
            // TODO: implement onRemove
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <SelectedItem key={item} label={item} onRemove={() => {}} />
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
      <StyledFieldset>
        <StyledLegend hasValue={(value?.length ?? 0) > 0 || isOpen}>
          <LegendContent>{label}</LegendContent>
        </StyledLegend>
      </StyledFieldset>
    </SelectContainer>
  );
};
