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
import { parseTypographyProps } from './parseTypography';
import { TypographyProps } from './style';

export const Heading1 = styled.h1<TypographyProps>`
  ${parseTypographyProps('headline', 'large')}
`;
