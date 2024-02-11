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

export const TooltipContainer = styled.div<{ top: string; left: string }>`
  visibility: hidden;
  position: absolute;
  top: 100%;
  font-size: 0.8rem;
  margin-top: 10px;
  // top: ${props => props.top};
  // left: ${props => props.left};
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.onSecondary};
  padding: 10px;
  border-radius: 5px;
  z-index: 100;
  white-space: nowrap;
  transition: opacity 0.3s;
  opacity: 0;
  &:after {
    content: '';
    position: absolute;
    top: -25%;
    left: ${props => props.left};
    // left: 50%;
    transform: rotate(180deg);
    // transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.secondary} transparent transparent transparent;
  }
`;

export const TooltipWrapper = styled.div`
  display: inline-flex;
  position: relative;
  visibility: visible;
  opacity: 1;

  &:hover ${TooltipContainer} {
    visibility: visible;
    opacity: 1;
  }
`;
