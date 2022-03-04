import * as React from "react";
import PropTypes from "prop-types";

import "./CtaCard.css";

const CtaCard = ({ children, title, iconHandle, link }) => {
  return (
    <div className="CtaCard">
      <a href={link} title={title}>
        <div className="CtaCard__heading">
          <div className={`CtaCard__icon CtaCard__icon--${iconHandle}`}>

          </div>
          <h2 className="CtaCard__title">
            {title}
            </h2>
        </div>
        <div className="CtaCard__body">
          {children}
          </div>
      </a>
    </div>
  );
};

CtaCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  link: PropTypes.string,
  iconHandle: PropTypes.string,
};

export default CtaCard;
