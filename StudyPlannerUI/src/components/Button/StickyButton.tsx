/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useEffect, useRef, useState } from 'react';
import IconButton, { IButtonWithIconProps } from 'components/Button/Button';
import SaveIcon from 'components/Icons/Save';
import styled from 'styled-components';
const OFFSET = 10;

const StyledButton = styled(IconButton)<{ sticky: boolean; navHeight: number }>`
  z-index: 2;
  position: ${({ sticky }) => (sticky ? 'fixed' : 'relative')};
  top: ${({ sticky, navHeight }) => (sticky ? `${navHeight}px` : '0')};
  cursor: pointer;
`;

const StickyButton: React.FC<IButtonWithIconProps> = ({ children, onClick, ...rest }) => {
  const [sticky, setSticky] = useState(false);
  const stickyRef = useRef(sticky); // useRef to store the current sticky state
  const stickyStylesRef = useRef({}); // useRef to store the current sticky styles

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonTop, setButtonTop] = useState<number>(0);
  const [navHeight, setNavHeight] = useState<number>(0);

  useEffect(() => {
    const button = document.getElementById('save-button');
    const nav = document.getElementsByTagName('nav')[0];

    if (button) {
      const chatElRect = button.getBoundingClientRect();
      setButtonTop(chatElRect.top);
    }

    if (nav) {
      const navRect = nav.getBoundingClientRect();
      setNavHeight(navRect.height);
    }
  }, []);

  useEffect(() => {
    if (!buttonTop) {
      return;
    }

    const scrollHandler = () => {
      const scrollTop = window.scrollY;
      const rect = buttonRef.current?.getBoundingClientRect();

      const shouldBeSticky = scrollTop >= buttonTop - navHeight - OFFSET;

      if (stickyRef.current !== shouldBeSticky) {
        stickyRef.current = shouldBeSticky;
        setSticky(shouldBeSticky);

        const stickyStyles = {
          position: 'fixed',
          left: `${rect?.left}px`,
          width: `${rect?.width}px`
        };

        const newStickyStyles = shouldBeSticky ? stickyStyles : {};

        stickyStylesRef.current = newStickyStyles;
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [buttonTop]);

  return (
    <StyledButton
      {...rest}
      id='save-button'
      rref={buttonRef}
      sticky={sticky}
      navHeight={navHeight + OFFSET}
      onClick={onClick}
      style={stickyStylesRef.current}
      icon={<SaveIcon size={'0.8rem'} />}
    >
      {children}
    </StyledButton>
  );
};

export default StickyButton;
