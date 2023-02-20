import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import classNames from "classnames";

import Icon from "../Icon";

// Styles.
import "./Button.css";

const Button = ({
  className = ``,
  children,
  startIcon,
  endIcon,
  color,
  pretend,
  active,
  ...props
}) => {
  let Tag = `button`;

  if (pretend) {
    Tag = `span`;
  }

  if (props.href) {
    Tag = `a`;
  }

  if (props.to) {
    Tag = Link;
  }

  return (
    <Tag
      className={classNames(
        `Button`,
        {
          [`Button--${color}`]: color,
          [`Button--active`]: active,
        },
        className
      )}
      {...props}
    >
      {startIcon && <Icon type={startIcon} />}
      <span className="Button__body">{children}</span>
      {endIcon && <Icon type={endIcon} />}
    </Tag>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  to: PropTypes.string,
  startIcon: PropTypes.string,
  endIcon: PropTypes.string,
  color: PropTypes.string,
  pretend: PropTypes.bool,
  active: PropTypes.bool,
};

export default Button;
