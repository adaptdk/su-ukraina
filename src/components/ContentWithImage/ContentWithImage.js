import * as React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image"

import "./ContentWithImage.css";

const ContentWithImage = ({ title, children }) => {
  return (
    <section className="ContentWithImage">

      <div className="ContentWithImage__content">
        {!!title && <h2 className="ContentWithImage__title">{title}</h2>}
        {!!children && <div className="ContentWithImage__children">{children}</div>}
      </div>

      <div class="ContentWithImage__image">
        <StaticImage src="../../images/photos/bukime-budrus-ir-pasiruose.jpg" alt={title}/>
      </div>

    </section>
  );
};

ContentWithImage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};


export default ContentWithImage;
