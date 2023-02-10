import React from "react";

import { FaqNav } from "../../Faq";
import Section from "../../Section";
import Constraint from "../../Constraint";
import Link from "../../Link";
import { getTranslatedText } from "../../../utils/getTranslatedText";
import Icon from "../../Icon";

import "./FaqCategoriesModule.css";
import { FaqCategoriesModulePropTypes } from "./FaqCategoriesModulePropTypes";

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

FaqCategoriesModule.propTypes = FaqCategoriesModulePropTypes;

export default FaqCategoriesModule;
