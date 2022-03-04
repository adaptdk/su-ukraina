import * as React from "react";
import PropTypes from "prop-types";

import "./Card.css";

const Card = ({ children, title, logo }) => {
  return (
    <article className="Card">
      <div className="Card__heading">
        <h2 className="Card__title">{title}</h2>
        {!!logo && <div className="Card__logo">{logo}</div>}
      </div>
      <div className="Card__body">{children}</div>
    </article>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  logo: PropTypes.any,
};

export default Card;
