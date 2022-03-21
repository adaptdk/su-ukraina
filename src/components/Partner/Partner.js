import * as React from "react";
import PropTypes from "prop-types";

import "./Partner.css";

const Partner = ({ title, logo, website }) => {
  return (
    <div className="Partner">
      <a href={website} target="_blank" rel="noopener" title={title}>
        {!!logo && <div className="Partner__logo">{logo}</div>}
      </a>
    </div>
  );
};

Partner.propTypes = {
  title: PropTypes.node,
  logo: PropTypes.node,
  website: PropTypes.node,
};

export default Partner;
