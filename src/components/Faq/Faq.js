import * as React from "react";
import PropTypes from "prop-types";
import ResourceList from "../../components/ResourceList";
import ResourceListItem from "../../components/ResourceList/ResourceListItem";
import FaqNav from "./FaqNav";

import "./Faq.css";

const Faq = ({ currentItemData, navData, faqHtml }) => {
  return (
    <div class="Faq">
      <FaqNav navData={navData} />

      <div className="FaqContent">
        <h1>{currentItemData.title_override}</h1>
        <div dangerouslySetInnerHTML={{ __html: faqHtml }} />

        {currentItemData.questions?.map((question, i) => {
          return (
            <div className="FaqQuestion">
              <details open>
                <summary>
                  <h2>{question.title}</h2>
                </summary>
                <div
                  class="FaqQuestion__answer"
                  dangerouslySetInnerHTML={{ __html: question.answer }}
                />

                {!!question.resources && (
                  <ResourceList>
                    {question.resources?.map((resource, j) => {
                      return (
                        <ResourceListItem
                          key={j}
                          title={resource.title}
                          subtitle={resource.subtitle}
                          url={resource.url}
                        />
                      );
                    })}
                  </ResourceList>
                )}
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Faq.propTypes = {
  currentItemData: PropTypes.shape({
    title: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        answer: PropTypes.string,
        resources: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            subtitle: PropTypes.string,
            url: PropTypes.string,
          })
        ),
      })
    ),
  }),
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      title_override: PropTypes.string,
    })
  ),
  pagePath: PropTypes.string,
};

export default Faq;
