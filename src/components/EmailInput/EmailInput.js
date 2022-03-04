import * as React from "react";
import PropTypes from "prop-types";

import "./EmailInput.css";

const EmailInput = (props) => {
  return <input type="email" {...props} />;
};

EmailInput.propTypes = {
  id: PropTypes.node,
  placeholder: PropTypes.node,
};

export default EmailInput;
