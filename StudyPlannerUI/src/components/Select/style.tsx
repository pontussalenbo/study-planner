import { StyledButton } from 'components/Button';
import styled from 'styled-components';

export const SelectWrapper = styled.div`
  display: grid;
  grid-template-areas:
    'label'
    'select';
  grid-template-rows: min-content min-content;
  gap: 8px;
`;

export const Label = styled.label`
  grid-area: label;
  font-weight: bold;
  font-size: 0.8em;
`;

export const Select = styled.select`
  grid-area: select;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const GetButton = styled(StyledButton)`
  display: block;
  height: max-content;
  padding: 15px;
  margin-top: auto;
`;
