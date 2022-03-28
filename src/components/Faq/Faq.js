import * as React from "react";
import PropTypes from "prop-types";
import ResourceList from "../../components/ResourceList";
import ResourceListItem from "../../components/ResourceList/ResourceListItem";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import FaqNav from "./FaqNav";

import "./Faq.css";
import Constraint from "../Constraint";

const Faq = ({ currentItemData, navData, faqHtml }) => {
  // Just took this from stackoverflow
  function fallbackCopyUrlToClipboard(text) {
    var textArea = document.createElement(`textarea`);
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = `0`;
    textArea.style.left = `0`;
    textArea.style.position = `fixed`;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand(`copy`);
      var msg = successful ? `successful` : `unsuccessful`;

      console.log(`Fallback: Copying text command was ` + msg);
    } catch (err) {
      console.error(`Fallback: Oops, unable to copy`, err);
    }

    document.body.removeChild(textArea);
  }
  function copyUrlToClipboard(text, index) {
    const url = `${window.location.href.replace(location.hash, ``)}${text}`;
    if (!navigator.clipboard) {
      fallbackCopyUrlToClipboard(url);
      return;
    }
    const copyPopup = document.querySelector(`.copy-popup-${index}`);
    navigator.clipboard.writeText(url).then(
      function () {
        console.log(`Async: Copying to clipboard was successful!`);
        copyPopup.classList.add(`copy-popup--active`);
        setTimeout(() => {
          copyPopup.classList.remove(`copy-popup--active`);
        }, 1000);
      },
      function (err) {
        console.error(`Async: Could not copy text: `, err);
      }
    );
  }

  return (
    <div className="Faq">
      <Constraint className="FaqInner">
        <FaqNav navData={navData} />

        <div className="FaqContent">
          <h1>{currentItemData.title_override}</h1>
          <div dangerouslySetInnerHTML={{ __html: faqHtml }} />

          {currentItemData.questions?.map((question, i) => {
            const image = question.image && (
              <GatsbyImage
                image={getImage(question.image)}
                alt="Image inside tab"
              />
            );

            return (
              <div className="FaqQuestion" key={i}>
                <details>
                  <summary>
                    <div className="FaqQuestion__summary">
                      <h2>{question.title}</h2>
                      <a className="FaqQuestion__anchor" id={`tab-${i}`}></a>
                    </div>
                  </summary>
                  <div
                    className="FaqQuestion__answer"
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  />

                  {!!image && <div className="FaqQuestion__image">{image}</div>}

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

                  <div className="FaqQuestion__actions">
                    <div className="FaqQuestion__actions-copy">
                      <span
                        onClick={() => {
                          return copyUrlToClipboard(`#tab-${i}`, i);
                        }}
                        className="copy"
                      >
                        Kопіювати посилання
                        <span
                          className={`copy-popup copy-popup-${i}`}
                          aria-hidden="true"
                        >
                          скопійовано
                        </span>
                      </span>
                    </div>
                  </div>
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
