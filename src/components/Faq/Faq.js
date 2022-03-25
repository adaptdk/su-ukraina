import * as React from "react";
import PropTypes from "prop-types";
import ResourceList from "../../components/ResourceList";
import ResourceListItem from "../../components/ResourceList/ResourceListItem";
import FaqNav from "./FaqNav";

import "./Faq.css";
import Constraint from "../Constraint";

const Faq = ({ currentItemData, navData, faqHtml }) => {
  return (
    <div className="Faq">
      <Constraint className="FaqInner">
        <FaqNav navData={navData} />

        <div className="FaqContent">
          <h1>{currentItemData.title_override}</h1>
          <div dangerouslySetInnerHTML={{ __html: faqHtml }} />

          {currentItemData.questions?.map((question, i) => {
            return (
              <div className="FaqQuestion" key={i}>
                <details open>
                  <summary>
                    <h2>{question.title}</h2>
                  </summary>
                  <div
                    className="FaqQuestion__answer"
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
                            buttonText={`Джерело`}
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
      </Constraint>
    </div>
  );
};

Faq.propTypes = {
  currentItemData: PropTypes.shape({
    title: PropTypes.string,
    title_override: PropTypes.string,
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
  faqHtml: PropTypes.string.isRequired,
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      title_override: PropTypes.string,
    })
  ),
  pagePath: PropTypes.string,
};

export default Faq;
