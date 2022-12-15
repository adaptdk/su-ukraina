import * as React from "react";
import PropTypes from "prop-types";

import "./Card.css";
import { Link } from "gatsby";
import { getOrganisationPagePath } from "../../build-utils/helpers/hooks";
import { localePropType } from "../../helpers/genericPropTypes";

const Card = ({ children, title, logo, locale }) => {
  const pagePath = getOrganisationPagePath(title, locale);
  return (
    <article className="Card">
      <Link to={`/${pagePath}`}>
        <div className="Card__heading">
          <h2 className="Card__title">{title}</h2>
          {!!logo && <div className="Card__logo">{logo}</div>}
        </div>
      </Link>
      <div className="Card__body">{children}</div>
    </article>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  logo: PropTypes.node,
  locale: localePropType.isRequired,
};

export default Card;
