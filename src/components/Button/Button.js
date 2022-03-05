import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

// Styles.
import "./Button.css";

const CN = `Button`;

const Button = ({ icon, text, color, position, ...props }) => {
  let Tag = `button`;

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
    <Tag className={`${CN} ${CN}__${color}`} {...props}>
      {icon && isIconAlignedLeft() && (
        <span className={`${CN}__icon ${CN}__icon--${icon}`} />
      )}
      {text}
      {icon && !isIconAlignedLeft() && (
        <span className={`${CN}__icon ${CN}__icon--${icon}`} />
      )}
    </Tag>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  position: PropTypes.string,
};

export default Button;
