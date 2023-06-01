import styled from 'styled-components';

export const SelectWrapper = styled.div`
  display: grid;
  grid-template-areas:
    'label'
    'select';
  grid-template-rows: min-content min-content;
  gap: 8px;
  max-width: 200px;
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

export const OptionalText = styled.span`
  font-size: 0.7rem;
  margin-left: 3px;
  font-weight: 300;
  font-style: italic;
`;
