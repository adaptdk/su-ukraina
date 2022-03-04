import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "./Button.css";

const CN = `Button`;

const Button = ({ href, to, icon, text }) => {
  let Tag = `button`;

  if (href) {
    Tag = `a`;
  }

  if (to) {
    Tag = Link;
  }

  return (
    <Tag className={CN} href={href} to={to}>
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
