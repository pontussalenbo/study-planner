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

const buttonSizes = {
  small: '0.8125rem',
  medium: '0.875rem',
  large: '0.9375rem'
};

const ButtonBase = styled.button<{
  color?: string;
  size?: keyof typeof buttonSizes;
  disabled?: boolean;
}>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  font-size: ${({ size }) => buttonSizes[size || 'medium']};
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  min-width: 64px;
  appearance: none;
  -webkit-appearance: none;
  -webkit-text-decoration: none;
  background: none;
  color: ${({ color }) => color || 'inherit'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const TextButton = styled(ButtonBase)``;

export const ContainedButton = styled(ButtonBase)`
  background-color: ${({ color }) => color || '#3f51b5'};
  color: white;
`;

export const OutlinedButton = styled(ButtonBase)`
  border: 1px solid ${({ color }) => color || '#3f51b5'};
`;

export const IconButton = styled.button<{
  color?: string;
  size?: keyof typeof buttonSizes;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 8px;
  border-radius: 50%;
  font-size: ${({ size }) => buttonSizes[size || 'medium']};
  background: none;
  color: ${({ color }) => color || 'inherit'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
