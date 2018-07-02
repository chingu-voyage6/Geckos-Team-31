import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {

  render() {
    const {
      label,
      onClick,
      className,
      theme,
      key,
    } = this.props;
    return (
      <div className="Button">
        <button
          onClick={onClick}
          className={theme || 'Button--list'}
          key={key}
        >
          {label}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
label: PropTypes.string,
onClick: PropTypes.func,
className: PropTypes.string,
theme: PropTypes.string,
key: PropTypes.string,
};
Button.defaultProps = {
label: undefined,
onClick: undefined,
className: undefined,
theme: undefined,
key: undefined,
};

export default Button;
