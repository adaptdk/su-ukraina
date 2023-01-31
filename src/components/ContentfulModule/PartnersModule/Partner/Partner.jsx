import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import "./Partner.css";
import { PartnerPropTypes } from "../PartnersModulePropTypes";

const Partner = ({ label, logo, url }) => {
  const logoImage = logo && (
    <GatsbyImage image={getImage(logo)} alt={label} height="80" />
  );

  return (
    <div className="Partner">
      <a href={url} target="_blank" rel="noopener" title={label}>
        {!!logo && <div className="Partner__logo">{logoImage}</div>}
      </a>
    </div>
  );
};

Partner.propTypes = PartnerPropTypes;

export default Partner;
