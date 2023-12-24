/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { Tokens } from 'style/tokens';
import styled from 'styled-components';

export const ListContainer = styled.div`
  max-height: 650px;
  width: 100%;
  overflow: auto;
  font-size: 14px;
  background-color: ${Tokens.neutralVariant20};
  color: ${({ theme }) => theme.inverseSurface};
  border-radius: 8px;
  padding: 0px 8px;
  margin-bottom: 1rem;
`;
