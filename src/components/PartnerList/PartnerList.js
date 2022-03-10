import * as React from "react";
import PropTypes from "prop-types";

import "./PartnerList.css";

const PartnerList = ({ children }) => {
  return <div className="PartnerList">{children}</div>;
};

PartnerList.propTypes = {
  children: PropTypes.node,
};

export default PartnerList;
