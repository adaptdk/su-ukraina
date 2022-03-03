import * as React from "react";
import PropTypes from "prop-types";

import "./Constraint.css";

const Constraint = ({ children, className = `` }) => {
  return <div className={`Constraint ${className}`}>{children}</div>;
};

Constraint.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Constraint;
