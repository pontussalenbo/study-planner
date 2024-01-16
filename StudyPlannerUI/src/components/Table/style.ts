import { Tokens } from 'style/tokens';
import styled from 'styled-components';

interface TableRowProps {
    header?: boolean;
}

export const TableRow = styled.div<TableRowProps>`
    ${({ header }) =>
        header &&
        `position: sticky;
      top: 0;
      background-color: ${Tokens.neutralVariant20};
      z-index: 1;`};
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.outline};
    &:last-child {
        border-bottom: none;
    }
    padding: 8px 0;
    font-weight: ${props => (props.header ? 'bold' : 'normal')};
`;

export const TableCell = styled.div`
    padding: 0 10px;
    flex: 1;
    align-self: center;
    word-wrap: break-word;
    overflow-wrap: break-word;
`;

export const NameCell = styled(TableCell)`
    flex: 4;
`;

export const ButtonCell = styled(TableCell)`
    padding: 0;
    min-width: 100px;
    flex: 0 0 auto;
    // child button
    & > button {
      min-width: 90px;
  `;

export const FilledTableRow = styled(TableRow)<{ fulfilled: boolean }>`
    background-color: ${({ theme, fulfilled }) => (fulfilled ? theme.fulfilled : 'transparent')};
`;

export const BoldCell = styled(TableCell)`
    font-weight: bold;
`;

export const BoldNameCell = styled(NameCell)`
    font-weight: bold;
`;
