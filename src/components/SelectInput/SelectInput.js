import * as React from "react";
import PropTypes from "prop-types";

import "./SelectInput.css";

const SelectInput = ({ id, children }) => {
  return (
    <select id={id}>
      {children}
    </select>
  );
};

SelectInput.propTypes = {
  id: PropTypes.node,
  children: PropTypes.node,
};

export default SelectInput;
