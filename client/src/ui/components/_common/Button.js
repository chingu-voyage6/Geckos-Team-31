import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({
  label,
  onClick,
  className,
  icon,
  theme,
  size,
  type,
}) => {
  const buttonClass = classNames('Button', {
    'Button--success': theme === 'success',
    'Button--warning': theme === 'warning',
    'Button--link': theme === 'link',
    'Button--highlight': theme === 'highlight',
    'Button--medium': size === 'medium',
    'Button--small': size === 'small',
    'Button--icon': icon,
    [className]: className,
  });
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
    >
      <div className="Button__inner">
        {icon || null}
        {label}
      </div>
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
};
Button.defaultProps = {
  label: undefined,
  onClick: undefined,
  className: undefined,
  theme: undefined,
  type: undefined,
  icon: undefined,
  size: undefined,
};

export default Button;
