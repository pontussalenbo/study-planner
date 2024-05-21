/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

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
    flex: 0 0 auto;
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
