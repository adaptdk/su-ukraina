import * as React from "react";
import PropTypes from "prop-types";

import "./Section.css";

const Section = ({ className = ``, bgColor, children }) => {
  return (
    <section
      className={`Section ${
        bgColor ? `Section--bg-${bgColor}` : ``
      } ${className}`}
    >
      {children}
    </section>
  );
};

Section.propTypes = {
  bgColor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Section;
