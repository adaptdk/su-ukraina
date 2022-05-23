import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Icon.css";

const Icon = ({ type, className, size = `small` }) => {
  return (
    <span
      className={classNames(`Icon`, className, {
        [`Icon--${type}`]: type,
        [`Icon--${size}`]: size,
      })}
    />
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
