import * as React from "react";
import PropTypes from "prop-types";

const TextArea = (props) => {
  return <textarea {...props}></textarea>;
};

TextArea.propTypes = {
  id: PropTypes.node,
  placeholder: PropTypes.node,
};

export default TextArea;
