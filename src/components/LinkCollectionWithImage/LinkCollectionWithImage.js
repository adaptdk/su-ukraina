import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// Style.
import "./LinkCollectionWithImage.css";
import { gatsbyImagePropType } from "../../helpers/genericPropTypes";

const LinkCollectionWithImage = ({ title, children, image }) => {
  return (
    <section className="LinkCollectionWithImage">
      <div className="LinkCollectionWithImage__text">
        {!!title && <h2 className="LinkCollectionWithImage__title">{title}</h2>}
        <ul className="LinkCollectionWithImage__button-list">{children}</ul>
      </div>

      {image && (
        <div className="LinkCollectionWithImage__image">
          <GatsbyImage image={getImage(image)} alt="" />
        </div>
      )}
    </section>
  );
};

LinkCollectionWithImage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  image: gatsbyImagePropType,
};

export default LinkCollectionWithImage;
