import * as React from "react";
import PropTypes from "prop-types";

import "./FormField.css";

const FormField = ({ type, label, labelFor, children }) => {
  return (
    <div className={`FormField FormField--type-${type}`}>
      <label htmlFor={labelFor}>{label}</label>
      {children}
    </div>
  );
};

FormField.propTypes = {
  type: PropTypes.node,
  label: PropTypes.node,
  labelFor: PropTypes.node,
  children: PropTypes.node,
};

export default FormField;
