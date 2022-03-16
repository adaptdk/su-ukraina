import * as React from "react";
import PropTypes from "prop-types";

import "./PositiveNegativeList.css";

const PositiveNegativeList = ({ children}) => {
  return (
    <section className="PositiveNegativeList">
        {children}
    </section>
  );
};

PositiveNegativeList.propTypes = {
  children: PropTypes.node,
};


export default PositiveNegativeList;
