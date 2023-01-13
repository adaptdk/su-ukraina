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

const CardHeading = ({ title, logo }) => {
  return (
    <div className="Card__heading">
      <h2 className="Card__title">{title}</h2>
      {!!logo && (
        <div className="Card__logo">
          <GatsbyImage image={getImage(logo)} alt={title} src="" />
        </div>
      )}
    </div>
  );
};

CardHeading.propTypes = {
  title: PropTypes.string,
  logo: gatsbyImagePropType,
};

const Card = ({ children, title, logo, locale, organisationType }) => {
  const pagePath = getOrganisationPagePath(title, locale, organisationType);

  if (pagePath) {
    return (
      <article className="Card">
        <Link to={`/${pagePath}`}>
          <CardHeading title={title} logo={logo} />
        </Link>
        <div className="Card__body">{children}</div>
      </article>
    );
  }

  return (
    <article className="Card">
      <CardHeading title={title} logo={logo} />
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
