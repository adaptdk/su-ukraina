import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { gatsbyImagePropType } from "../../../helpers/genericPropTypes";

const Thumbnail = ({ img, url }) => {
  if (!img) {
    return null;
  }

  const getThumbnail = () => (
    <GatsbyImage
      className="PromotionBannerModule__thumbnail"
      image={getImage(img)}
    />
  );

  if (!url) {
    return getThumbnail();
  }

  return <Link to={url}>{getThumbnail()}</Link>;
};

Thumbnail.propTypes = {
  img: gatsbyImagePropType.isRequired,
  url: PropTypes.string,
};

export default Thumbnail;
