import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: auto;
  border: none;
`;

export const TableRowHeader = styled.thead`
  background-color: transparent;
  transition: all 0.25s ease;
`;

export const TableHeader = styled.th`
  background-color: #f1f1f1;
  font-weight: 500;
  text-align: left;
  font-size: 1rem;
  color: #2c3e50;
`;

export const TableRow = styled.tr`
  cursor: auto;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  border: none;
  padding: 0.3rem;
`;
