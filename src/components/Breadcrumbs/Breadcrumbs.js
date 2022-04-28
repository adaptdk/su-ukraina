import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "gatsby-plugin-breadcrumb";

import "./Breadcrumbs.css";

const Breadcrumbs = ({ crumbs }) => {
  return (
    <div className="Breadcrumbs">
      <Breadcrumb crumbs={crumbs} hiddenCrumbs={[`/ua/`]} />
    </div>
  );
};

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      crumbLabel: PropTypes.string.isRequired,
    })
  ),
};

export default Breadcrumbs;
