import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  label,
  onChange,
  name,
  // className,
  // theme,
  // isSubmit,
  type,
  children,
}) => (
  <div className="Select">
    <p>
      {label}
    </p>
    <select
      name={name}
      label={label}
      type={type}
      onChange={onChange}
      className="Select--input"
    >
      {children}
    </select>
  </div>
);

Select.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  // className: PropTypes.string,
  // theme: PropTypes.string,
  // isSubmit: PropTypes.bool,
  type: PropTypes.string,
};
Select.defaultProps = {
  label: undefined,
  onChange: undefined,
  name: undefined,
  children: undefined,
  // className: undefined,
  // theme: undefined,
  // isSubmit: undefined,
  type: undefined,
};

export default Select;
