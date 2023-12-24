/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import styled from 'styled-components';
import { floatToHex } from 'utils/colors';

export const TwoColumnWrapper = styled.div`
    background-color: ${({ theme }) => theme.tertiary + floatToHex(0.2)};
    border-radius: 10px;
    padding: 10px 20px;
    display: grid;
    grid-template-rows: repeat(7, auto); /* 7 items per column */
    grid-auto-columns: 1fr; /* Makes each new column take up the full width */
    grid-auto-flow: column; /* Makes items flow into new columns after the 8th item */
    grid-gap: 10px 5px; /* Gap between items */
`;
