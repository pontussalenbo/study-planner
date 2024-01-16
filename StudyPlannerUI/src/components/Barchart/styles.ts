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

export const ArrowButton = styled.button`
    &:hover {
        cursor: pointer;
        background: ${Tokens.neutral30};
    }
    &:active {
        scale: 0.95;
        background-color: ${Tokens.neutral25};
        color: ${({ theme }) => theme.onSecondaryContainer};
    }
    border: 1px solid white;
    border-radius: 6px;
    padding: 5px 10px;
    color: white;
`;

export const ButtonIcon = styled.span`
    margin-right: 4px;
`;

export const Wrapper = styled.div`
    margin-top: auto;
    width: 100%;
`;
