/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ArrowButton = styled.button`
  position: fixed;
  right: 15px;
  bottom: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  z-index: 10000;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.primary}};
  &:hover {
    background-color: ${({ theme }) => theme.surfaceTint}};
  }
  border-radius: 50%;
`;

const ArrowIcon = styled.svg<{ isPointingDown: boolean }>`
  transform: ${props => (props.isPointingDown ? 'rotate(-180deg)' : 'rotate(0deg)')};
  transition: transform 0.5s ease-in-out;
  fill: ${({ theme }) => theme.onPrimary};
`;

const ScrollArrow = () => {
  const [isScrollable, setIsScrollable] = useState(false);

  const [isPointingDown, setIsPointingDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const element = document.documentElement; // or any other scrollable element you want to check
      const isElementScrollable = element.scrollHeight > element.clientHeight;
      setIsScrollable(isElementScrollable);

      if (scrollTop + clientHeight >= scrollHeight / 2) {
        setIsPointingDown(false);
      }

      if (scrollTop === 0) {
        setIsPointingDown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    const targetY = isPointingDown ? document.body.scrollHeight : 0;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    setIsPointingDown(prev => !prev);
  };

  return isScrollable ? (
    <ArrowButton onClick={handleClick}>
      <Circle>
        <ArrowIcon isPointingDown={isPointingDown} width='30' height='40' viewBox='0 0 24 24'>
          <path d='M12 3l-6 9h5v9h2v-9h5z' />
        </ArrowIcon>
      </Circle>
    </ArrowButton>
  ) : null;
};

export default ScrollArrow;
