/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { ReactNode } from 'react';
import styled from 'styled-components';
import { floatToHex } from 'utils/colors';

export interface ContainerProps {
  columns?: number;
  gap?: string;
  breakpoint?: string;
}
export const Container = styled.div<ContainerProps>`
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

export const TwoColumnGrid = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.tertiary + floatToHex(0.2)}};
  border-radius: 10px;
  padding: 10px 20px;
  display: grid;
  grid-template-rows: repeat(7, auto); /* 7 items per column */
  grid-auto-columns: 1fr; /* Makes each new column take up the full width */
  grid-auto-flow: column; /* Makes items flow into new columns after the 8th item */
  grid-gap: 10px 5px; /* Gap between items */
`;
interface Props extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  width?: string;
  flex?: number | string;
  height?: string;
  margin?: string;
  padding?: string;
  px?: string;
  py?: string;
  order?: number;
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  gap?: string;
}

export const FlexContainer = styled.div<Props>`
  display: flex;
  gap: ${({ gap }) => gap || '0'};
  order: ${({ order }) => order};
  flex: ${({ flex }) => flex || undefined};
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding ?? '0'};
  padding-left: ${({ px }) => px ?? '0'};
  padding-right: ${({ px }) => px ?? '0'};
  padding-top: ${({ py }) => py ?? '0'};
  padding-bottom: ${({ py }) => py ?? '0'};
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  box-shadow: ${({ boxShadow }) => boxShadow || 'none'};
`;
