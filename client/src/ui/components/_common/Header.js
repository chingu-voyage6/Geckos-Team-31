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
  heading: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Header.defaultProps = {
  size: undefined,
};

export default Header;
