import styled from 'styled-components';
import { device } from 'utils/breakpoints';

// Add the following styled components
export const StyledTableContainer = styled.div`
  overflow-x: auto;
  height: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media ${device.sm} {
    font-size: 0.9rem;
  }
  @media ${device.xs} {
    font-size: 0.8rem;
  }
`;
// Add this CSS within the Table component
export const StyledHeader = styled.th`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;

  @media ${device.sm} {
    font-size: 0.9rem;
  }
  @media ${device.md} {
    font-size: 0.8rem;
  }
`;

export const StyledCell = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;

  @media ${device.sm} {
    font-size: 0.9rem;
  }
  @media ${device.xs} {
    font-size: 0.8rem;
  }
`;
