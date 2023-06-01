import styled from 'styled-components';
import { breakpoints, device } from 'utils/breakpoints';

export const StyledTableContainer = styled.div`
    width: max-content;
    max-width: 100%;
    overflow-x: auto;
    height: auto;
    margin-bottom: 1rem;
`;

export const StyledTable = styled.table`
    width: auto;
    border-collapse: collapse;
    @media ${device.sm} {
        font-size: 0.8em;
    }

    @media ${device.xs} {
        font-size: 0.7em;
    }
`;
// Add this CSS within the Table component
export const StyledHeader = styled.th`
    border: 1px solid ${({ theme }) => theme.tableBorder};
    padding: 8px;
    @media (max-width: ${breakpoints.sm}px) {
        padding: 5px 2px;
    }
    text-align: left;
    background-color: ${({ theme }) => theme.header};
    color: ${({ theme }) => theme.text};
`;

export const CenteredHeader = styled(StyledHeader)`
    text-align: center;
`;

export const StyledCell = styled.td`
    padding: 8px;
    text-align: left;
`;

export const TableBody = styled.tbody`
    tr:nth-child(even) {
        background-color: ${({ theme }) => theme.header};
    }
    tr:nth-child(odd) {
        background-color: ${({ theme }) => theme.secondary};
    }
`;
