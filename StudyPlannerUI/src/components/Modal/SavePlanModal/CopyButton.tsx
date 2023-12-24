/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as CopyIcon } from 'assets/copy-icon.svg';
import { ReactComponent as CheckmarkIcon } from 'assets/check-mark-icon.svg';
import { StyledButton } from 'components/Button/style';

const Tooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  &.visible {
    opacity: 1;
  }
`;

interface CopyButtonProps {
  onClick: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopyClick = useCallback(() => {
    setIsCopied(true);
    setShowTooltip(true);
    // Implement your copy to clipboard logic here
    onClick();

    // Hide the tooltip and reset the icon after 3 seconds
    setTimeout(() => {
      setShowTooltip(false);
      setIsCopied(false);
    }, 3000);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <StyledButton variant='primary' onClick={handleCopyClick}>
        {isCopied ? <CheckmarkIcon width={24} height={24} /> : <CopyIcon width={24} height={24} />}
      </StyledButton>
      {showTooltip && <Tooltip className='visible'>Copied!</Tooltip>}
    </div>
  );
};

export default CopyButton;
