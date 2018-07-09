import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  const { heading, size } = props;
  return (
    <div className="Header">
      {size === 'large'
        ? (
          <h1>
            {heading}
          </h1>
        )
        : (
          <h2>
            {heading}
          </h2>
        )}
    </div>
  );
};

Header.propTypes = {
  heading: PropTypes.string,
  size: PropTypes.string,
};

Header.defaultProps = {
  heading: undefined,
  size: undefined,
};

export default Header;
