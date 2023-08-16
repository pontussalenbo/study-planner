import styled from 'styled-components';
import { breakpoints } from 'utils/breakpoints';

export const StyledTableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    height: auto;
    margin-bottom: 1rem;
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;
// Add this CSS within the Table component
export const StyledHeader = styled.th`
    // border: 1px solid ${({ theme }) => theme.outline};
    padding: 8px;
    @media (max-width: ${breakpoints.sm}px) {
        padding: 5px 2px;
    }
    text-align: left;
    background-color: ${({ theme }) => theme.secondary + '13'};
    color: ${({ theme }) => theme.onSurface};
`;

export const CenteredHeader = styled(StyledHeader)`
    text-align: center;
`;

export const StyledCell = styled.td`
    border-bottom: 1px solid ${({ theme }) => theme.outline};
    padding: 8px;
    text-align: left;
`;

export const TableBody = styled.tbody`
    background-color: ${({ theme }) => theme.primary + '0c'};
`;

export const TableWrapper = styled.div`
    border-radius: 10px;
    overflow: auto;
    max-width: 100%;
    border: 1px solid #000;
`;

export const GridTable = styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: minmax(min-content, 1fr) minmax(50px, 200px) repeat(4, minmax(50px, 1fr));
    width: 100%; // Ensure the table takes the full width

    & > div {
        padding: 10px 0px;
    }

    & > div:last-child {
        border-right: none; // Remove the right border for the last cell
    }

    div.header {
        font-weight: bold;
        border-bottom: 1px solid #ccc; // Add a border-bottom to header cells
    }
`;
