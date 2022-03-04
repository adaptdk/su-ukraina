import * as React from "react";
import PropTypes from "prop-types";

import "./Section.css";

const Section = ({ customClass, bgColor, children }) => {
  return (
    <section className={`Section Section--bg-${bgColor} ${customClass}`}>{children}</section>
  );
};

Section.propTypes = {
  bgColor: PropTypes.node,
  customClass: PropTypes.node,
  children: PropTypes.node,
};

export default Section;
