import * as React from "react";
import PropTypes from "prop-types";

import "./ContactChipSections.css";

const ContactChipSections = ({ children }) => {
  return <div className="ContactChipSections">{children}</div>;
};

ContactChipSections.propTypes = {
  children: PropTypes.node,
};

export default ContactChipSections;
