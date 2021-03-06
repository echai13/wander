import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

const menuItems = [
  'expressions',
  'travels',
  'about wander',
  'itineraries'
];

const renderMenuItems = (item, index) => (
  <span key={`${item}-${index}`}>{item}</span>
);

const Navbar = () => (
  <NavbarWrapper>
    {menuItems.map(renderMenuItems)}
  </NavbarWrapper>
)

export default Navbar;

const NavbarWrapper = styled.nav`
  display: inline-flex;
  justify-content: space-evenly;
  width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  height: 48px;
  align-items: center;
  position: fixed;
  cursor: pointer;
  z-index: 1;
  opacity: 0.75;
`;
