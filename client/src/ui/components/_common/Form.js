import React from 'react';
import PropTypes from 'prop-types';

const Form = ({
  formId, children, onSubmit, action, method,
}) => (
  <div className="Form">
    <form
      id={formId}
      action={action}
      method={method}
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
  action: PropTypes.string,
  method: PropTypes.string,
};

Form.defaultProps = {
  onSubmit: undefined,
  formId: undefined,
  children: undefined,
  method: undefined,
  action: undefined,
};

export default Form;
