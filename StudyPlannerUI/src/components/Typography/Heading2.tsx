/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import styled from 'styled-components';
import { TypographyProps } from './style';
import { parseTypographyProps } from './parseTypography';

export const Heading2 = styled.h2<TypographyProps>`
  ${parseTypographyProps('headline', 'medium')}
`;
