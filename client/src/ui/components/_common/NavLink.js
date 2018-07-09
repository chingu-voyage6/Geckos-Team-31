import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavLink = ({
  label,
  link,
}) => (
  <div className="NavLink">
    <Link
      to={link}
      className="NavLink--button"
    >
      {label}
    </Link>
  </div>
);

NavLink.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
};
NavLink.defaultProps = {
  label: undefined,
  link: undefined,
};

export default NavLink;
