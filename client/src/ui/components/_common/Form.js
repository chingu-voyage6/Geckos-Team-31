import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ formId, children, onSubmit }) => (
  <div className="Form">
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
    >
      {children}
    </form>
  </div>
);

Form.propTypes = {
  formId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: undefined,
  formId: undefined,
  children: undefined,
};

export default Form;
