import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div<{ top: string; left: string }>`
  visibility: hidden;
  position: absolute;
  // top: ${props => props.top};
  // left: ${props => props.left};
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
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

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
  visibility: visible;
  opacity: 1;

  &:hover ${TooltipContainer} {
    visibility: visible;
    opacity: 1;
  }
`;

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  enabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, enabled = true }) => {
  const childRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: '0px', left: '0px' });

  const handleMouseEnter = () => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      console.log(rect);

      setPosition({ top: `${rect.y}px`, left: `${rect.width / 2}px` });
    }
  };
  if (enabled) {
    return (
      <TooltipWrapper ref={childRef} onMouseEnter={handleMouseEnter}>
        {children}
        <TooltipContainer top={position.top} left={position.left}>
          {text}
        </TooltipContainer>
      </TooltipWrapper>
    );
  } else {
    return <>{children}</>;
  }
};

export default Tooltip;
