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

import { GenericTypography, TypographyProps } from './style';

export const Paragraph = styled.p<TypographyProps>`
  font-size: ${({ size }) => size || '1rem'};
  font-weight: ${({ weight }) => weight || 400};
  ${GenericTypography};
`;

export const InlineParagraph = styled.span<TypographyProps>`
  font-size: ${({ size }) => size || '1rem'};
  font-weight: ${({ weight }) => weight || 400};
  ${GenericTypography};
`;
