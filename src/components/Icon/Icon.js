import * as React from "react";
import PropTypes from "prop-types";

import "./Icon.css";

const Icon = ({ type }) => {
  return <span className={`Icon Icon--${type}`} />;
};

Icon.propTypes = {
  type: PropTypes.string,
};

export default Icon;
