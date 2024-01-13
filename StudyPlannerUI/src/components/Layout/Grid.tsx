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

import styled from 'styled-components';
import React from 'react';
import { floatToHex } from 'utils/colors';

interface ContainerProps {
  columns?: number;
  gap?: string;
  breakpoint?: string;
}

const Container = styled.div<ContainerProps>`
  padding: 0 15px;
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  gap: ${props => props.gap || '20px'};
  width: 100%;

  @media (max-width: ${props => props.breakpoint || '992px'}) {
    grid-template-columns: 1fr;
  }
`;

interface GridItemProps {
  order?: number;
  mobileOrder?: number;
  breakpoint?: string;
}

export const GridItem = styled.div<GridItemProps>`
  width: 100%;
  order: ${props => props.order || 'initial'};

  @media (max-width: ${props => props.breakpoint || '992px'}) {
    order: ${props => props.mobileOrder || props.order || 'initial'};
  }
`;

interface LayoutProps extends ContainerProps {
  children: React.ReactNode;
}

export function Grid({ children, columns, gap, breakpoint }: LayoutProps) {
  return (
    <Container columns={columns} gap={gap} breakpoint={breakpoint}>
      {children}
    </Container>
  );
}

export const TwoColumnGrid = styled.div`
  background-color: ${({ theme }) => theme.tertiary + floatToHex(0.2)}};
  border-radius: 10px;
  padding: 10px 20px;
  display: grid;
  grid-template-rows: repeat(7, auto); /* 7 items per column */
  grid-auto-columns: 1fr; /* Makes each new column take up the full width */
  grid-auto-flow: column; /* Makes items flow into new columns after the 8th item */
  grid-gap: 10px 5px; /* Gap between items */
`;
