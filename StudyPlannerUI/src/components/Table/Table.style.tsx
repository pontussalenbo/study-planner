import styled from 'styled-components';

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    border: none;
`;

export const TableRowHeader = styled.thead`
    background-color: transparent;
    transition: all 0.25s ease;
    border-radius: 10px;
`;

export const TableHeader = styled.th`
    background-color: #f1f1f1;
    padding: 12px;
    font-weight: 500;
    text-align: left;
    font-size: 14px;
    color: #2c3e50;
    first-child {
        border-top-left-radius: 10px;
    }
    last-child {
        border-top-right-radius: 10px;
    }
`;

export const TableRow = styled.tr`
    cursor: auto;
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

export const TableCell = styled.td`
    padding: 12px;
    font-size: 14px;
    color: grey;
`;
