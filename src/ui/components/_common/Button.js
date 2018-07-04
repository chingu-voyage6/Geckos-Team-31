import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  label,
  onClick,
  className,
  theme,
  key,
  isSubmit,
}) => (
  <div className="Button">
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      className={theme || className || 'Button--list'}
      key={key}
    >
      {label}
    </button>
  </div>
);

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.string,
  key: PropTypes.string,
  isSubmit: PropTypes.bool,
};
Button.defaultProps = {
  label: undefined,
  onClick: undefined,
  className: undefined,
  theme: undefined,
  key: undefined,
  isSubmit: undefined,
};

export default Button;
