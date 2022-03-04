import * as React from "react";
import PropTypes from "prop-types";

import "./TextInput.css";

const TextInput = ({ id, placeholder }) => {
  return (
    <input type="text" id={id} placeholder={placeholder}/>
  );
};

TextInput.propTypes = {
  id: PropTypes.node,
  placeholder: PropTypes.node,
};

export default TextInput;
