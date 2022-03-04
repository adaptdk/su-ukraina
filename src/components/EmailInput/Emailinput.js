import * as React from "react";
import PropTypes from "prop-types";

import "./EmailInput.css";

const EmailInput = ({ id, placeholder }) => {
  return (
    <input type="email" id={id} placeholder={placeholder}/>
  );
};

EmailInput.propTypes = {
  id: PropTypes.node,
  placeholder: PropTypes.node,
};

export default EmailInput;
