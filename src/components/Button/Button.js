import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

// Styles.
import "./Button.css";

const Button = ({
  className = ``,
  children,
  icon,
  color,
  position,
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

  const isIconAlignedLeft = () => {
    return position === `left`;
  };

  return (
    <Tag
      className={`Button Button--${color} ${className} ${
        active ? `Button--active` : ``
      }`}
      {...props}
    >
      {icon && isIconAlignedLeft() && (
        <span className={`Button__icon Button__icon--${icon}`} />
      )}
      {children}
      {icon && !isIconAlignedLeft() && (
        <span className={`Button__icon Button__icon--${icon}`} />
      )}
    </Tag>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  position: PropTypes.string,
  pretend: PropTypes.bool,
  active: PropTypes.bool,
};

export default Button;
