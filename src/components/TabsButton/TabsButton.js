import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import classNames from "classnames";

// Styles.
import "./TabsButton.css";

const TabsButton = ({ text, active, pagePath, ...props }) => {
  let Tag = `button`;

  if (props.href) {
    Tag = `a`;
  }

  if (props.to) {
    Tag = Link;
  }

  return (
    <Tag
      className={classNames(`TabsButton`, {
        "TabsButton--active": !!active || props.to === pagePath,
      })}
      {...props}
    >
      {text}
    </Tag>
  );
};

TabsButton.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.string,
  pagePath: PropTypes.string,
};

export default TabsButton;
