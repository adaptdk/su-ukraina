import * as React from "react";
import PropTypes from "prop-types";

import "./Icon.css";

const Icon = ({ type, size = `small` }) => {
  return <span className={`Icon Icon--${size} Icon--${type}`} />;
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default Icon;
