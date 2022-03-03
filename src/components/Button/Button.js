import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "./Button.css";

const Button = ({ children, href, to }) => {
  let Tag = `button`;

  if (href) {
    Tag = `a`;
  }

  if (to) {
    Tag = Link;
  }

  return (
    <Tag className="Button" href={href} to={to}>
      {children}
    </Tag>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  to: PropTypes.string,
};

export default Button;
