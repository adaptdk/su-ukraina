import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

// Styles.
import "./TabsButton.css";

const CN = `TabsButton`;

const TabsButton = ({ text, active, ...props }) => {
  let Tag = `button`;

  if (props.href) {
    Tag = `a`;
  }

  if (props.to) {
    Tag = Link;
  }

  return (
    <Tag className={`${CN} ${CN}--${active}`} {...props}>
      {text}
    </Tag>
  );
};

TabsButton.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.string,
};

export default TabsButton;
