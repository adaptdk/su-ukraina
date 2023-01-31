import React from "react";
import PropTypes from "prop-types";

import { FaqNav } from "../../Faq";
import { FaqCategoriesPropType } from "../../Faq/FaqPropTypes";
import Section from "../../Section";
import Constraint from "../../Constraint";
import Link from "../../Link";
import { getTranslatedText } from "../../../utils/getTranslatedText";
import Icon from "../../Icon";

import "./FaqCategoriesModule.css";

const FaqCategoriesModule = ({ heading, seeAllLink, categories, pathname }) => {
  return (
    <Section className="FaqCategoriesModule">
      <Constraint>
        {heading && <h2>{heading}</h2>}
        <FaqNav
          rootPath={seeAllLink}
          categories={categories}
          pathname={pathname}
        />
        {seeAllLink && (
          <Link className="FaqCategoriesModule__see-all" to={seeAllLink}>
            <span className="FaqCategoriesModule__see-all-text">
              {getTranslatedText(`actions.seeAll`)}
            </span>
            {` `}
            <Icon type="arrow-blue" />
          </Link>
        )}
      </Constraint>
    </Section>
  );
};

FaqCategoriesModule.propTypes = {
  heading: PropTypes.string,
  seeAllLink: PropTypes.string,
  categories: FaqCategoriesPropType.isRequired,
  pathname: PropTypes.string,
};

export default FaqCategoriesModule;
