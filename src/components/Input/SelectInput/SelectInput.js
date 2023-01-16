import * as React from "react";
import PropTypes from "prop-types";

const SelectInput = (props) => {
  return <select {...props} />;
};

SelectInput.propTypes = {
  id: PropTypes.node,
  children: PropTypes.node,
};

export default SelectInput;
