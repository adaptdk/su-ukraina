import * as React from "react";
import PropTypes from "prop-types";

import "./CardList.css";

const CardList = ({ children }) => {
  return <div className="CardList">{children}</div>;
};

CardList.propTypes = {
  children: PropTypes.node,
};

export default CardList;
