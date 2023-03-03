import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getTranslatedText } from "../../utils/getTranslatedText";

import Constraint from "../Constraint";
import Button from "../Button";
import Breadcrumbs from "../Breadcrumbs";

import { FaqItemPropTypes, FaqModule } from "./FaqModule";
import { FaqNavCollapsible } from "./FaqNav";
import { FaqCategoriesPropType } from "./FaqPropTypes";
import { ResourceListModulePropTypes } from "../ContentfulModule/ResourceListModule";
import { formatRichText } from "../../helpers/formatting";

import "./Faq.css";

// Used stackoverflow as reference
// Not a 1:1 copy
// https://stackoverflow.com/a/37033774
const openTarget = () => {
  const hash = location.hash.substring(1);
  if (hash) {
    const details = Array.from(document.getElementById(hash).children).find(
      (element) => {
        return element.tagName === `DETAILS`;
      }
    );
    if (details) {
      details.open = true;
    }
  }
};

const Faq = ({
  title,
  description,
  categories,
  rootPath,
  pathname,
  content,
  crumbs,
}) => {
  useEffect(() => {
    window.addEventListener(`hashchange`, openTarget);
    openTarget();

    return () => {
      window.removeEventListener(`hashchange`, openTarget);
    };
  }, []);

  useEffect(() => {
    return () => {
      document.body.removeAttribute(`data-filters`);
    };
  }, []);

  const handleFaqNavSensorChange = (e) => {
    if (typeof window === `undefined`) {
      return;
    }
    if (e.target.checked) {
      // This data attribute disables body scrollbar
      document.body.dataset.filters = `visible`;
    } else {
      document.body.removeAttribute(`data-filters`);
    }
  };

  return (
    <div className="Faq" itemScope itemType="https://schema.org/FAQPage">
      <Constraint className="Faq__inner">
        <input
          type="checkbox"
          name="faqnav-sensor"
          id="faqnav-sensor"
          onChange={handleFaqNavSensorChange}
        />
        {!!categories && (
          <FaqNavCollapsible
            categories={categories}
            rootPath={rootPath}
            pathname={pathname}
          />
        )}

        <div className="Faq__content">
          <Breadcrumbs crumbs={crumbs} />
          <h1>{title}</h1>
          {description?.raw && formatRichText(description.raw)}

          {content?.at(0) &&
            content.map((module, index) => {
              return (
                <FaqModule key={module.id} module={module} index={index} />
              );
            })}
        </div>

        <label className="Faq__faqnav-trigger" htmlFor="faqnav-sensor">
          <Button
            className="Faq__faqnav-trigger-button"
            color="secondary"
            pretend
          >
            {getTranslatedText(`labels.navigation`)}
          </Button>
        </label>
        <label className="Faq__faqnav-overlay" htmlFor="faqnav-sensor" />
      </Constraint>
    </div>
  );
};

export const FaqNavDataPropTypes = {
  id: PropTypes.string,
  pageHeading: PropTypes.string,
  slug: PropTypes.string,
  iconType: PropTypes.string,
};

Faq.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.shape({
    raw: PropTypes.string,
  }),
  categories: FaqCategoriesPropType,
  pathname: PropTypes.string.isRequired,
  rootPath: PropTypes.string.isRequired,
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      crumbLabel: PropTypes.string.isRequired,
    })
  ).isRequired,
  content: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape(ResourceListModulePropTypes),
      PropTypes.shape(FaqItemPropTypes),
    ])
  ),
};

export default Faq;
