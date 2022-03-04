import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "./Button.css";

const CN = `Button`;

const Button = ({ icon, text, ...props }) => {
  let Tag = `button`;

  if (props.href) {
    Tag = `a`;
  }

  if (props.to) {
    Tag = Link;
  }

  return (
    <Tag className={CN} {...props}>
      {icon && <span className={`${CN}__icon ${CN}__icon--${icon}`} />}
      {text}
    </Tag>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
};

export default Button;
