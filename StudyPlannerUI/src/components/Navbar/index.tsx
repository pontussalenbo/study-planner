import { useState } from 'react';
import { Nav, Logo, NavLink, NavLinks, NavItem, SocialsNavLink, Icon } from './styles';
import Hamburger from './Hamburger';
import BMC from 'components/Icons/BMC';

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
          <NavLink onClick={() => scrollTo('courses')}>Courses</NavLink>
        </NavItem>
        <NavItem isOpen={isOpen} idx={2}>
          <NavLink onClick={() => scrollTo('master-check')}>Master Check</NavLink>
        </NavItem>
        <NavItem isOpen={isOpen} idx={3}>
          <NavLink onClick={() => scrollTo('my-plan')}>My Plan</NavLink>
        </NavItem>
        <NavItem isOpen={isOpen} idx={4}>
          <NavLink onClick={() => scrollTo('graphs')}>Graphs</NavLink>
        </NavItem>
        <NavItem isOpen={isOpen} idx={5}>
          <SocialsNavLink href='#'>
            <Icon invert src='/github-mark.png' alt='GH' width={24} height={24} />
          </SocialsNavLink>
          <SocialsNavLink href='#'>
            <BMC size={24} />
          </SocialsNavLink>
        </NavItem>
      </NavLinks>
      <Hamburger onClick={toggleNav} />
    </Nav>
  );
}

export default Navbar;
