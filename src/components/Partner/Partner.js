import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import "./Partner.css";

const Partner = ({ title, logo, website }) => {
  const logoImage = logo && (
    <GatsbyImage image={getImage(logo)} alt={title} height="80" />
  );

  return (
    <div className="Partner">
      <a href={website} target="_blank" rel="noopener" title={title}>
        {!!logo && <div className="Partner__logo">{logoImage}</div>}
      </a>
    </div>
  );
};

Partner.propTypes = {
  title: PropTypes.node,
  logo: PropTypes.object,
  website: PropTypes.node,
};

export default Partner;
