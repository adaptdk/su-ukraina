import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

import "./SubPage.css";

const SubPage = ({ title, intro, children, image, imageIsLeft }) => {
  const imageSide = imageIsLeft ? "left" : "right";
  const contentClass = image ? `has-image has-image--${imageSide}` : ``;

  return (
    <section className={`SubPage ${contentClass}`}>
      <div className={`SubPage__content`}>
        <div className="SubPage__content-text">
          <h2 className="SubPage__title">{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: intro }} />
        </div>
        {!!image && (
          <div className="SubPage__content-image">
            <GatsbyImage image={getImage(image)} alt={title} />
          </div>
        )}
      </div>
      {children}
    </section>
  );
};

SubPage.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  image: PropTypes.string,
  imageIsLeft: PropTypes.bool,
  children: PropTypes.node,
};

export default SubPage;
