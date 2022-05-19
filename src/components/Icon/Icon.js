import * as React from "react";
import PropTypes from "prop-types";

import "./Icon.css";

const Icon = ({ type, size = `small`, align = `start`, className = `` }) => {
  return (
    <span
      className={`Icon ${className} Icon--${align} Icon--${size} Icon--${type}`}
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
