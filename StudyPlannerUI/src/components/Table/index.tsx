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

export const TableContainer = styled.div`
  max-height: 650px;
  width: 100%;
  overflow-y: auto;
  font-size: 14px;
  background-color: ${Tokens.neutralVariant20};
  color: ${({ theme }) => theme.inverseSurface};
  border-radius: 8px;
  padding: 0px 8px;
  margin-bottom: 1rem;
  @media (max-width: 500px) {
    font-size: 10px;
    padding: 0px 4px;
    max-height: 400px;
  }
`;
export const Table = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: 1fr 2fr repeat(${props => props.cols - 2}, 1fr);
  width: 100%;
  overflow-x: auto;
`;
export const TableHeader = styled.div`
  display: contents;
`;
export const TableHeaderCell = styled.div`
  :hover {
    ${({ onClick }) => onClick && ' cursor: pointer'};
  }
  padding: 10px;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 1;
  @media (max-width: 500px) {
    font-weight: bold;
    font-size: 12px;
    padding: 5px;
  }
`;
export const TableRow = styled.div`
  display: contents;
`;
export const TableCell = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  > button {
    width: 100%;
  }
  @media (max-width: 500px) {
    padding: 5px;
    > button {
      width: 30px;
    }
  }
`;
