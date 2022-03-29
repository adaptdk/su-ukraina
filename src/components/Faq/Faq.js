import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { ResourceList, ResourceListItem } from "../ResourceList";
import FaqNav from "./FaqNav";
import Constraint from "../Constraint";
import Button from "../Button";

import "./Faq.css";

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
  function copyUrlToClipboard(text) {
    const url = `${window.location.href.replace(location.hash, ``)}${text}`;
    if (!navigator.clipboard) {
      fallbackCopyUrlToClipboard(url);
      return;
    }
    navigator.clipboard.writeText(url).then(
      function () {
        console.log(`Async: Copying to clipboard was successful!`);
      },
      function (err) {
        console.error(`Async: Could not copy text: `, err);
      }
    );
  }

  const handleFaqNavSensorChange = (e) => {
    if (typeof window === `undefined`) {
      return;
    }
    if (e.target.checked) {
      document.body.dataset.faqnav = `visible`;
    } else {
      document.body.removeAttribute(`data-faqnav`);
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
        <FaqNav navData={navData} />

        <div className="Faq__content">
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
              <div className="Faq__question" id={`tab-${i}`} key={i}>
                <details>
                  <summary>
                    <div className="Faq__question__summary">
                      <h2>{question.title}</h2>
                    </div>
                  </summary>
                  <div
                    className="Faq__question__answer"
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  />

                  {!!image && (
                    <div className="Faq__question__image">{image}</div>
                  )}

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

                  <div className="Faq__question__actions">
                    <div className="Faq__question__actions-copy">
                      <span
                        onClick={() => {
                          return copyUrlToClipboard(`#tab-${i}`);
                        }}
                        className="copy"
                      >
                        Kопіювати посилання
                      </span>
                    </div>
                  </div>
                </details>
              </div>
            );
          })}
        </div>

        <label className="Faq__inner__faqnav-trigger" htmlFor="faqnav-sensor">
          <Button
            className="Faq__inner__faqnav-trigger-button"
            color="secondary"
            pretend
            text="НАВІГАЦІЯ"
          />
        </label>
        <label className="Faq__inner__faqnav-overlay" htmlFor="faqnav-sensor" />
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
