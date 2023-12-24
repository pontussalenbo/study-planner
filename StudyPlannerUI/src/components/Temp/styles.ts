/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

// TODO : Remove this file and move components to a more appropriate location
import styled from 'styled-components';

export const FilterContainer = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    margin-bottom: 1rem;
`;

export const GetStatsBar = styled.div`
    display: flex;
    height: 100%;
    gap: 1rem;
    justify-content: space-between;
    align-items: flex-end;
`;
