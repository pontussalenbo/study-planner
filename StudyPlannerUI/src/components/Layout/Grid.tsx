import styled from 'styled-components';
import React from 'react';

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
