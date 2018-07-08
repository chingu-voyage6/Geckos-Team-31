import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  label,
  onClick,
  // className,
  theme,
  // isSubmit,
  type,
}) => (
  <div className="Button">
    <button
      type={type}
      onClick={onClick}
      className={theme ? `Button--${theme}` : 'Button--list'}
    >
      {label}
    </button>
  </div>
);

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  // className: PropTypes.string,
  theme: PropTypes.string,
  // isSubmit: PropTypes.bool,
  type: PropTypes.string,
};
Button.defaultProps = {
  label: undefined,
  onClick: undefined,
  // className: undefined,
  theme: undefined,
  // isSubmit: undefined,
  type: undefined,
};

export default Button;
