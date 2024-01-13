/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { css } from 'styled-components';

export interface TypographyProps {
    color?: string;
    size?: string;
    weight?: number;
    lineHeight?: string;
    letterSpacing?: string;
    fontStyle?: 'normal' | 'italic' | 'oblique';
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

export const GenericTypography = css<TypographyProps>`
    line-height: ${({ lineHeight }) => lineHeight};
    letter-spacing: ${({ letterSpacing }) => letterSpacing || '0'};
    color: ${({ color }) => color};
    font-style: ${({ fontStyle }) => fontStyle || 'normal'};
    text-transform: ${({ textTransform }) => textTransform || 'none'};
    margin: 1rem 0;
`;
