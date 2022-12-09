import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getTranslatedText } from "../../utils/getTranslatedText";

import { FaqNavCollapsible } from "./FaqNav";
import Constraint from "../Constraint";
import Button from "../Button";
import Breadcrumbs from "../Breadcrumbs";

import "./Faq.css";
import { formatRichText } from "../../helpers/formatting";
import { FaqModule } from "./FaqModule";
import { ResourceListModulePropTypes } from "../ContentfulModule/ResourceListModule";
import { FaqItemPropTypes } from "./FaqModule/FaqItem/FaqItemPropTypes";

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

/** @todo: don't know currently how to generate the answer for metadata
 * because the answer comes as a JSON string
 */

// const generateLdMetadataArr = (currentItemData) => {
//   const { questions } = currentItemData;
//   if (questions && questions.length) {
//     const questionsMetadataLdArray = questions.map((question) => {
//       let questionObj = {};
//       (questionObj[`@type`] = `Question`),
//         (questionObj[`name`] = question.title),
//         (questionObj[`acceptedAnswer`] = {
//           "@type": `Answer`,
//           text: question.answer,
//         });
//       return questionObj;
//     });
//     const metadataLDObj = {
//       "@context": `https://schema.org`,
//       "@type": `FAQPage`,
//       mainEntity: questionsMetadataLdArray,
//     };
//     return metadataLDObj;
//   } else {
//     return false;
//   }
// };

const Faq = ({ title, description, navData, content, crumbs }) => {
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

  // SEE NOTE ABOVE FOR generateLdMetadataArr
  // useEffect(() => {
  //   const metadataLdContent = generateLdMetadataArr(currentItemData);
  //   let script;
  //   if (metadataLdContent) {
  //     script = document.createElement(`script`);
  //     script.type = `application/ld+json`;
  //     script.innerText = JSON.stringify(metadataLdContent);
  //     document.body.appendChild(script);
  //   }
  //   return () => {
  //     if (script) {
  //       document.body.removeChild(script);
  //     }
  //   };
  // }, [currentItemData]);

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
    <div className="Faq">
      <Constraint className="Faq__inner">
        <input
          type="checkbox"
          name="faqnav-sensor"
          id="faqnav-sensor"
          onChange={handleFaqNavSensorChange}
        />
        {!!navData && <FaqNavCollapsible navData={navData} />}

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
  navData: PropTypes.arrayOf(PropTypes.shape(FaqNavDataPropTypes)).isRequired,
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      crumbLabel: PropTypes.string.isRequired,
    })
  ).isRequired,
  content: PropTypes.oneOfType([
    PropTypes.shape(ResourceListModulePropTypes),
    PropTypes.shape(FaqItemPropTypes),
  ]),
};

export default Faq;
