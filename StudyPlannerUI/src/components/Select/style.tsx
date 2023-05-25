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
  font-size: 1em;
`;

export const Select = styled.select`
  grid-area: select;
  padding: 2px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.secondary};
  min-width: 100px;
`;
