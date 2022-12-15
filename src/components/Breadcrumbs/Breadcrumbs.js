import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "gatsby-plugin-breadcrumb";

import "./Breadcrumbs.css";
import { kebabCaseToTitleCase } from "../../helpers/formatting";

const Breadcrumbs = ({ crumbs }) => {
  const formattedCrumbs = crumbs.map(({ pathname, crumbLabel }) => {
    return { pathname, crumbLabel: kebabCaseToTitleCase(crumbLabel) };
  });

  return (
    <div className="Breadcrumbs">
      <Breadcrumb crumbs={formattedCrumbs} hiddenCrumbs={[`/ua/`]} />
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
