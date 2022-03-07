import * as React from "react";
import PropTypes from "prop-types";

import Constraint from "../Constraint";

import "./HeroBanner.css";

const HeroBanner = ({ title, subtitle, children }) => {
  return (
    <section className="HeroBanner">
      <div className="HeroBanner__text">
        <Constraint>
          {!!title && <h1>{title}</h1>}
          {!!subtitle && <p>{subtitle}</p>}
        </Constraint>
      </div>
      <div className="HeroBanner__content">{children}</div>
    </section>
  );
};

HeroBanner.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

export default HeroBanner;
