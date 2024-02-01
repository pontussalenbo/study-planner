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

export const Pill = styled.div<{ color?: string }>`
  background-color: ${({ theme, color }) => color || theme.tertiary};
  color: ${({ theme }) => theme.onTertiary}};
  height: 24px;
  max-width: 60px;
  border-radius: 8px 8px 8px 8px;
  padding: 5px 12px;
  border-radius: 15px;
  text-align: center;
  font-size: 0.85em;
  font-weight: 500;
   overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.85em;
  flex: 1 0 70%;
  align-self: center;
`;

export const PillContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  align-items: center;
  flex: 1 0 30%; // This makes the pills take up at most 50% width
`;
