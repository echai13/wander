import React from 'react'
import Link from 'gatsby-link'

import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

const menuItems = [
  'expressions',
  'travels',
  'about',
  'itineraries'
]

const handleHover = menuItem => {
  const unselectedItems = menuItems.filter(item => item !== menuItem);
  unselectedItems.forEach(item => {
    document.getElementById(item).style.display = 'none';
  });
  document.getElementById(menuItem).style.display = 'block';
}

const handleMouseOut = menuItem => {
  document.getElementById(menuItem).style.display = 'none';
}

const Navbar = () => (
  <nav>
    <div className="ui four column doubling stackable grid container nav-menu">
      <div
        className="column"
        onMouseOver={() => handleHover('expressions')}
        onMouseOut={() => handleMouseOut('expressions')}
      >
        expressions
      </div>

      <div
        className="column"
        onMouseEnter={() => handleHover('travels')}
        onMouseOut={() => handleMouseOut('travels')}
      >
        travels
      </div>

      <div
        className="column"
        onMouseEnter={() => handleHover('about')}
        onMouseOut={() => handleMouseOut('about')}
      >
        about
      </div>

      <div
        className="column"
        onMouseEnter={() => handleHover('itineraries')}
        onMouseOut={() => handleMouseOut('itineraries')}
      >
        itineraries
      </div>
    </div>
  </nav>
)

export default Navbar
