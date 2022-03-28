import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Constraint from "../Constraint";
import FaqNav from "./FaqNav";
import ResourceList from "../../components/ResourceList";
import ResourceListItem from "../../components/ResourceList/ResourceListItem";

import "./Faq.css";

// Just took this from stackoverflow
// https://stackoverflow.com/a/30810322
const fallbackCopyTextToClipboard = (text) => {
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
};
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log(`Async: Copying to clipboard was successful!`);
    },
    function (err) {
      console.error(`Async: Could not copy text: `, err);
    }
  );
}

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

const handleAnchorClick = (e) => {
  const el = document.createElement(`span`);
  el.className = `copy-popup`;
  el.ariaHidden = true;
  el.innerText = e.target.dataset.copied;
  e.target.parentNode.appendChild(el);
  setTimeout(() => {
    el.classList.add(`copy-popup--active`);
  }, 1);

  setTimeout(() => {
    el.classList.remove(`copy-popup--active`);
    setTimeout(() => {
      el.parentNode.removeChild(el);
    }, 500);
  }, 1001);

  copyTextToClipboard(e.target.href);

  e.preventDefault();
};

const Faq = ({ currentItemData, navData, faqHtml }) => {
  React.useEffect(() => {
    window.addEventListener(`hashchange`, openTarget);
    openTarget();

    return () => {
      window.removeEventListener(`hashchange`, openTarget);
    };
  }, []);

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
            const tabId = `tab-${i}`;

            return (
              <div className="FaqQuestion" id={tabId} key={tabId}>
                <details>
                  <summary>
                    <div className="FaqQuestion__summary">
                      <h2>{question.title}</h2>
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
                      <a
                        href={`#${tabId}`}
                        data-copied="Скопійовано"
                        onClick={(e) => {
                          handleAnchorClick(e);
                        }}
                        className="copy"
                      >
                        Kопіювати посилання
                      </a>
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
