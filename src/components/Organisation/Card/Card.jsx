import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { getOrganisationPagePath } from "../../../build-utils/helpers/hooks";
import {
  gatsbyImagePropType,
  localePropType,
} from "../../../helpers/genericPropTypes";

import "./Card.css";

const Card = ({ children, title, logo, locale, organisationType }) => {
  const pagePath = getOrganisationPagePath(title, locale, organisationType);

  if (pagePath) {
    return (
      <article className="Card">
        <Link to={`/${pagePath}`}>
          <div className="Card__heading">
            <h2 className="Card__title">{title}</h2>
            {!!logo && (
              <div className="Card__logo">
                <GatsbyImage image={getImage(logo)} alt={title} src="" />
              </div>
            )}
          </div>
        </Link>
        <div className="Card__body">{children}</div>
      </article>
    );
  }

  // @todo: extract and refactor
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
  logo: gatsbyImagePropType,
  locale: localePropType.isRequired,
  organisationType: PropTypes.oneOf([`Donation`, `Volunteering`]),
};

export default Card;
