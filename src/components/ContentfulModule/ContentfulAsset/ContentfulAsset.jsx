import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

import { ContentfulAssetPropTypes } from "./ContentfulAssetPropTypes";

const ContentfulAsset = ({ file: { contentType }, gatsbyImageData: image }) => {
  if (contentType.includes(`image`)) {
    return <GatsbyImage image={image} alt="" src="" />;
  }

  return null;
};

ContentfulAsset.propTypes = ContentfulAssetPropTypes;

export default ContentfulAsset;
