import * as React from "react";
import PropTypes from "prop-types";

import "./TextArea.css";

const TextArea = ({ id, placeholder }) => {
  return (
    <textarea id={id} placeholder={placeholder}></textarea>
  );
};

TextArea.propTypes = {
  id: PropTypes.node,
  placeholder: PropTypes.node,
};

export default TextArea;
