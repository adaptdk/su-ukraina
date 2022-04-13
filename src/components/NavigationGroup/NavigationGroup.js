import React from "react";
import PropTypes from "prop-types";
import Breadcrumb from "../Breadcrumbs";
import AdditionalNavigation from "../AdditionalNavigation";

import "./NavigationGroup.css";

const NavigationGroup = ({ crumbs, additionalNav }) => {
  return (
    <container className="NavigationGroup">
      {crumbs && <Breadcrumb crumbs={crumbs} />}
      {additionalNav && <AdditionalNavigation additionalNav={additionalNav} />}
    </container>
  );
};

NavigationGroup.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.string),
  additionalNav: PropTypes.arrayOf(PropTypes.string),
};

export default NavigationGroup;
