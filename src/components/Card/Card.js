import * as React from "react";
import PropTypes from "prop-types";

import "./Card.css";

const Card = ({ children, title, subtitle, externalImage, logo }) => {
  return (
    <article className="Card">
      <header className="Card__heading">
        <div className="Card__heading-text">
          <h2 className="Card__title">{title}</h2>
          {!!subtitle && <div className="Card__subtitle">{subtitle}</div>}
        </div>
        {!!logo && <div className="Card__logo">{logo}</div>}
        {!!externalImage && (
          <div className="Card__externalLogo">
            <img src={externalImage} />
          </div>
        )}
      </header>
      <div className="Card__body">{children}</div>
    </article>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  logo: PropTypes.node,
  subtitle: PropTypes.node,
  externalImage: PropTypes.node,
};

export default Card;
