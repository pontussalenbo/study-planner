/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import styled, { css, keyframes } from 'styled-components';

/**
 * Interface for togglable components
 */
interface Togglable {
  /**
   * Whether the component is open or not
   */
  isOpen: boolean;
}

/**
 * Interface for components that are animated in a sequence
 */
interface SeqAnimimated extends Togglable {
  /**
   * The index of the component in the sequence
   */
  idx: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  min-height: 10vh;
  background-color: ${({ theme }) => theme.background};
`;

export const Logo = styled.div`
  margin-left: 1rem;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const NavLinks = styled.ul<Togglable>`
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    justify-content: space-evenly;
    right: 0px;
    top: 8vh;
    transition: width 0.2s ease-in-out;
    min-height: ${({ isOpen }) => (isOpen ? '200px' : '0vh')};
    width: ${({ isOpen }) => (isOpen ? '100%' : '0vw')};
    background-color: ${({ theme }) => theme.background};
  }

  /* Align items on large navbar */
  @media screen and (min-width: 576px) {
    /* Align items to the center */
    li:first-child {
      margin-left: auto;
    }

    /* Align socials to the right (or other items that are last) */
    li:last-child {
      margin-left: auto;
    }
  }
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.onBackground};
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;
`;

export const NavItem = styled.li<SeqAnimimated>`
  list-style: none;
  margin: 0 1rem;
  @media (max-width: 576px) {
    opacity: 0;
  }
  animation: ${({ isOpen, idx }) =>
    isOpen
      ? css`
          ${fadeIn} 0.3s ease-in forwards ${idx * 0.3}s
        `
      : ''};
`;

export const SocialsNavLink = styled(NavLink)`
  margin: 0 0.5rem;
`;

export const Icon = styled.img<{ invert?: boolean }>`
  display: inline-block;
  filter: ${({ invert }) => (invert ? 'invert(1)' : 'none')};
`;
