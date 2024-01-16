/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { typography } from 'style/typography';

type TypographyType = keyof typeof typography;
type Size = 'small' | 'medium' | 'large';

export const parseTypographyProps = (t: TypographyType, size: Size) => {
    const { fontFamilyName, fontFamilyStyle, fontWeight, fontSize, lineHeight, letterSpacing } =
        typography[t][size];

    return `
    font-family: ${fontFamilyName}, ${fontFamilyStyle};
    font-weight: ${fontWeight};
    font-size: ${fontSize};
    line-height: ${lineHeight};
    letter-spacing: ${letterSpacing};
  `;
};
