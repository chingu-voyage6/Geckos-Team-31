import React from 'react';
import NavLink from './NavLink';
import Button from './Button';


const NavBar = () => (
  <div className="NavBar">
    <NavLink
      link="/"
      label="Home"
    />
    <NavLink
      link="/talk"
      label="Talk board"
    />
    <NavLink
      link="/add-images"
      label="Add images"
    />
  </div>
);

NavBar.propTypes = {

};

NavBar.defaultProps = {

};

export default NavBar;
