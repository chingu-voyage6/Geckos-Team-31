import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    label,
    type,
    onChange,
    className,
    min,
    max,
    placeholder,
    name,
  } = props;
  return (
    <div className="Input">
      <label htmlFor={name}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        onChange={onChange}
        min={min}
        max={max}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

Input.defaultProps = {
  label: undefined,
  type: undefined,
  onChange: undefined,
  className: undefined,
  min: undefined,
  max: undefined,
  placeholder: undefined,
  name: undefined,

};

export default Input;
