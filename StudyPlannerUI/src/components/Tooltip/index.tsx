/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useRef, useState } from 'react';

import { TooltipContainer, TooltipWrapper } from './style';

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
      setPosition({ top: `${rect.y}px`, left: `${rect.width / 2 - 5}px` });
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
