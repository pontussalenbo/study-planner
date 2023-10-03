import { Tokens } from 'style/tokens';
import styled from 'styled-components';

export const Label = styled.label`
  grid-area: label;
  font-weight: bold;
  font-size: 1em;
`;

interface Openable {
  isOpen: boolean;
}

export const StyledFieldset = styled.fieldset<Openable>`
  text-align: left;
  position: absolute;
  bottom: 0;
  right: 0;
  top: -8px;
  left: 0;
  margin: 0;
  padding: 0 8px;
  // pointer-events: none;
  border-radius: inherit;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  min-width: 0%;
  border-width: 2px;
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
  float: unset;
  width: auto;
  overflow: hidden;
  display: block;
  padding: 0;
  height: calc(1em + 3px);
  font-size: 0.8em;
  visibility: hidden;
  max-width: ${({ hasValue }) => (hasValue ? '100%' : '0.01px')};
  -webkit-transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  white-space: nowrap;
`;

export const LegendContent = styled.span`
  padding-left: 5px;
  padding-right: 5px;
  display: inline-flex;
  color: white;
  visibility: visible;
  opacity: 1;
`;

export const SelectLabel = styled.label<Openable>`
  display: block;
  margin: 0.5rem 1rem;
  transform: ${props => (props.isOpen ? 'translateY(-18px)' : 'translateY(-1px)')};
  transition: transform 0.3s ease;
  font-size: 0.85rem;
  visibility: ${props => (props.isOpen ? 'hidden' : 'visible')};
`;

export const SelectContainer = styled.div<{ isOpen: boolean; disabled: boolean }>`
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
    opacity: 0.7;
    pointer-events: none;
  `}
`;

export const Arrow = styled.span<Openable>`
  margin-right: 8px;
  margin-left: auto;
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
  font-size: 0.7rem;
`;

export const DropdownList = styled.ul`
  position: absolute;
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.onSurfaceVariant};
  top: calc(100% + 2px); // Offset to move beyond the border.
  left: 0px; // Adjust based on left padding of the SelectContainer.
  width: 100%; // Increase width to account for the paddings.
  border: 1px solid ${({ theme }) => theme.outline};
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 101;
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

export const OptionItem = styled.li`
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

export const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.primary};
`;

export const Pill = styled.div`
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

export const RemoveIcon = styled.span`
  margin-left: 8px;
`;
