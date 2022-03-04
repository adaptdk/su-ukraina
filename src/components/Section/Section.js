import * as React from "react";
import PropTypes from "prop-types";

import "./Section.css";

const Section = ({ bgColor, children }) => {
  return (
    <section className={`Section Section--bg-${bgColor}`}>
      {children}
    </section>
  );
};

Section.propTypes = {
  bgColor: PropTypes.node,
  children: PropTypes.node,
};

export default Section;
