import * as React from "react";
import PropTypes from "prop-types";

// Components.
import Constraint from "../Constraint";

// Style.
import "./PromoLine.css";

const PromoLine = ({
  title,
  titleLink,
  className = ``,
  modifier,
  children,
}) => {
  return (
    <div
      className={`PromoLine ${
        modifier ? `PromoLine--${modifier}` : ``
      } ${className}`}
    >
      <Constraint className="PromoLine__content">
        <a href={titleLink} rel="noopener noreferrer" target="_blank">
          {title}
        </a>
        <div className="PromoLine__actions">{children}</div>
      </Constraint>
    </div>
  );
};

PromoLine.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  titleLink: PropTypes.string,
  modifier: PropTypes.string,
  children: PropTypes.node,
};

export default PromoLine;
