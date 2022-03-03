import * as React from "react";
import PropTypes from "prop-types";

import "./Card.css";

const Card = ({ children, title }) => {
  return (
    <article className="Card">
      <div className="Card__heading">
        <h2 className="Card__title">{title}</h2>
      </div>
      <div className="Card__body">{children}</div>
    </article>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
};

export default Card;
