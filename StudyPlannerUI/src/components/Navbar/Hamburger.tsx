/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useState } from 'react';
import styled from 'styled-components';

const Line = styled.span`
  transition: all 0.5s ease-in-out;
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: ${({ theme }) => theme.onBackground};
  border-radius: 9px;
  opacity: 1;
  left: 0;
`;

const NavIcon2 = styled.div<{ isOpen: boolean }>`
  width: 20px;
  height: 20px;
  display: block;
  margin-left: auto;
  margin-right: 1rem;
  transform: rotate(0deg);
  transition: all 1.5s ease-in-out;
  cursor: pointer;

  @media (min-width: 576px) {
    display: none;
  }

  span:nth-child(1) {
    top: ${({ isOpen }) => (isOpen ? '7px' : '0px')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(135deg)' : 'rotate(0deg)')};
  }

  span:nth-child(2) {
    top: 7px;
    width: 80%;
    margin-left: auto;
    transition: all 0.5s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
    left: ${({ isOpen }) => (isOpen ? '60px' : '20%')};
  }

  span:nth-child(3) {
    top: ${({ isOpen }) => (isOpen ? '7px' : '14px')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-135deg)' : 'rotate(0deg)')};
  }
`;

interface NavIcon2Props {
  onClick: () => void;
}

const NavIcon2StyledComponent: React.FC<NavIcon2Props> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    onClick();
    setIsOpen(!isOpen);
  };

  return (
    <NavIcon2 isOpen={isOpen} onClick={handleClick}>
      <Line />
      <Line />
      <Line />
    </NavIcon2>
  );
};

export default NavIcon2StyledComponent;
