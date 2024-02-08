/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useState } from 'react';

import BMC from 'components/Icons/BMC';

import Hamburger from './Hamburger';
import { Icon, Logo, Nav, NavItem, NavLink, NavLinks, SocialsNavLink } from './styles';

const GITHUB_URL = 'https://github.com/pontussalenbo/study-planner';
const BMAC_URL = 'https://www.buymeacoffee.com/studyplannerlth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen(!isOpen);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const navbarHeight = 15;
    if (el) {
      const rect = el.getBoundingClientRect();
      // Offset in vh
      const offsetY = (window.innerHeight * -navbarHeight) / 100;

      // Calculate the absolute position
      const absoluteX = window.pageXOffset + rect.left;
      const absoluteY = window.pageYOffset + rect.top;

      // Scroll with the offset
      window.scrollTo(absoluteX + 0, absoluteY + offsetY);
    }
  };

  return (
    <Nav>
      <Logo>
        <NavLink href='#'>
          <img src='/favicon-32x32.png' alt='logo' />
        </NavLink>
      </Logo>
      <NavLinks isOpen={isOpen}>
        <NavItem isOpen={isOpen} idx={1}>
          <NavLink href='#' onClick={() => scrollTo('courses')}>
            Courses
          </NavLink>
        </NavItem>
        <NavItem isOpen={isOpen} idx={2}>
          <NavLink href='#' onClick={() => scrollTo('master-check')}>
            Master Check
          </NavLink>
        </NavItem>
        <NavItem isOpen={isOpen} idx={3}>
          <NavLink href='#' onClick={() => scrollTo('my-plan')}>
            My Plan
          </NavLink>
        </NavItem>
        <NavItem isOpen={isOpen} idx={4}>
          <NavLink href='#' onClick={() => scrollTo('graphs')}>
            Graphs
          </NavLink>
        </NavItem>
        <NavItem isOpen={isOpen} idx={5}>
          <SocialsNavLink
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Link to GitHub code repository'
            href={GITHUB_URL}
          >
            <Icon invert src='/github-mark.png' alt='GH' width={24} height={24} />
          </SocialsNavLink>
          <SocialsNavLink
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Link to By Me a Coffee'
            href={BMAC_URL}
          >
            <BMC size={24} />
          </SocialsNavLink>
        </NavItem>
      </NavLinks>
      <Hamburger onClick={toggleNav} />
    </Nav>
  );
}

export default Navbar;
