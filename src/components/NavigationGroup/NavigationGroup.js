import React from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "../Breadcrumbs";
import AdditionalNavigation from "../AdditionalNavigation";

import "./NavigationGroup.css";

const NavigationGroup = ({ crumbs }) => {
  return (
    <container className="NavigationGroup">
      {crumbs && <Breadcrumbs crumbs={crumbs} />}
      <AdditionalNavigation />
    </container>
  );
};

NavigationGroup.propTypes = {
  crumbs: PropTypes.array,
  additionalNav: PropTypes.arrayOf(PropTypes.string),
};

export default NavigationGroup;
