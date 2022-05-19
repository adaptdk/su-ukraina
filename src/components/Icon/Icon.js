import * as React from "react";
import PropTypes from "prop-types";

import "./Icon.css";

const Icon = ({ type, className = ``, align = `start`, size = `small` }) => {
  return (
    <span
      className={`Icon Icon--${type} ${className} Icon--${align} Icon--${size}`}
    />
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
  align: PropTypes.string,
};

export default Icon;
