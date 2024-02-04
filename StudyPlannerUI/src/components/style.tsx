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

interface PillProps {
  color?: string;
}

export const Pill = styled.div<PillProps>`
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
  background-color: ${({ theme, color }) => color || theme.tertiary};
  color: ${({ theme }) => theme.onTertiary}};
`;
export const FilterContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;
