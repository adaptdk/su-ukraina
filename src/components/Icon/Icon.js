import * as React from "react";
import PropTypes from "prop-types";

import "./Icon.css";

const Icon = ({ type, className = ``, size = `small` }) => {
  return <span className={`Icon Icon--${type} ${className} Icon--${size}`} />;
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
