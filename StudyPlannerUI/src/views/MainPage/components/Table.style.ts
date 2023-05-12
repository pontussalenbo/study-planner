import styled from 'styled-components';
import { device } from 'utils/breakpoints';

export const StyledTableContainer = styled.div`
  overflow-x: auto;
  height: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media ${device.xs} {
    font-size: 0.7em;
  }

  @media ${device.sm} {
    font-size: 0.8em;
  }
`;
// Add this CSS within the Table component
export const StyledHeader = styled.th`
  border: 1px solid ${({ theme }) => theme.tableBorder};
  padding: 8px;
  text-align: left;
  background-color: ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.text};
`;

export const StyledCell = styled.td`
  padding: 8px;
  text-align: left;
`;

export const TableBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.secondary};
  }
`;
