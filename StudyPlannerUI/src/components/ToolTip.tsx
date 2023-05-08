// Tooltip.tsx
import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Position = 'top' | 'right' | 'bottom' | 'left';
interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: Position;
  disabled?: boolean;
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const TooltipText = styled.div<{ position: Position }>`
  visibility: hidden;
  background-color: rgba(60, 60, 60, 0.9);
  color: #fff;
  text-align: center;
  padding: 5px 10px;
  border-radius: 4px;
  position: absolute;
  z-index: 1;
  white-space: nowrap;

  ${({ position }) => {
    switch (position) {
      case 'top':
        return `
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          &:after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: rgba(60, 60, 60, 0.9) transparent transparent transparent;
          }
        `;
      case 'right':
        return `
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent rgba(60, 60, 60, 0.9);
          }
        `;
      case 'bottom':
        return `
          top: 125%;
          left: 50%;
          transform: translateX(-50%);
          &:after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent rgba(60, 60, 60, 0.9) transparent;
          }
        `;
      case 'left':
        return `
          top: 50%;
          right: 100%;
          transform: translateY(-50%);
          &:after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: transparent rgba(60, 60, 60, 0.9) transparent transparent;
          }
        `;
      default:
        return '';
    }
  }}
`;

const TooltipTrigger = styled.div<{ disabled?: boolean }>`
  ${({ disabled }) =>
    disabled &&
    `
    &:hover ${TooltipText} {
      visibility: visible;
    }
  `}
`;

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = 'top',
  disabled = false
}) => {
  return (
    <TooltipWrapper>
      <TooltipTrigger disabled={disabled}>
        {children}
        <TooltipText position={position}>{text}</TooltipText>
      </TooltipTrigger>
    </TooltipWrapper>
  );
};

export default Tooltip;
