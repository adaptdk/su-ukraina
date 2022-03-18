import * as React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";

// Style.
import "./LinkCollectionWithImage.css";

const LinkCollectionWithImage = ({ title, children }) => {
  return (
    <section className="LinkCollectionWithImage">
      <div className="LinkCollectionWithImage__text">
        {!!title && <h2 className="LinkCollectionWithImage__title">{title}</h2>}
        <ul className="LinkCollectionWithImage__button-list">{children}</ul>
      </div>

      <div className="LinkCollectionWithImage__image">
        <StaticImage
          src="../../images/photos/bukime-budrus-ir-pasiruose.jpg"
          alt={title}
        />
      </div>
    </section>
  );
};

LinkCollectionWithImage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default LinkCollectionWithImage;
