/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useCallback, useState } from 'react';
import CheckmarkIcon from 'assets/check-mark-icon.svg?react';
import CopyIcon from 'assets/copy-icon.svg?react';
import { useTheme } from 'styled-components';

import { IconButton } from 'components/Button/Buttons';
import Tooltip from 'components/Tooltip';

interface CopyButtonProps {
  onClick: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const theme = useTheme();

  const handleCopyClick = useCallback(() => {
    setIsCopied(true);
    setShowTooltip(true);
    // Implement your copy to clipboard logic here
    onClick();

    // Hide the tooltip and reset the icon after 3 seconds
    const to = setTimeout(() => {
      setShowTooltip(false);
      setIsCopied(false);
    }, 3000);
    return () => clearTimeout(to);
  }, []);

  return (
    <>
      <Tooltip enabled={showTooltip} text='Copied!'>
        <IconButton onClick={handleCopyClick}>
          {isCopied ? (
            <CheckmarkIcon fill={theme.primary} width={24} height={24} />
          ) : (
            <CopyIcon fill={theme.primary} width={24} height={24} />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default CopyButton;
