import * as React from "react";
import PropTypes from "prop-types";

import "./CtaCard.css";
import Link from "../Link";
import Icon from "../Icon";

const CtaCard = ({ children, title, iconHandle, link, ...props }) => {
  if (!title || !link) {
    return null;
  }

  return (
    <div className="CtaCard">
      <Link to={link} title={title} {...props}>
        <div className="CtaCard__heading">
          <Icon className="CtaCard__icon" type={iconHandle} />
          <div className="CtaCard__title">{title}</div>
        </div>
        {!!children && <div className="CtaCard__body">{children}</div>}
      </Link>
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
