import * as React from "react";
import PropTypes from "prop-types";

import "./Constraint.css";

const Constraint = ({ children }) => {
  return <div className="Constraint">{children}</div>;
};

Constraint.propTypes = {
  children: PropTypes.node,
};

export default Constraint;
