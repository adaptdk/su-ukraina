import React from "react";
import { formatRichText } from "../../../helpers/formatting";
import {
  StepsModulePropTypes,
  StepsModuleDefaultProps,
} from "./StepsModulePropTypes";
import { getTranslatedText } from "../../../utils/getTranslatedText";
import { handleAnchorClick } from "../../Faq";

import "./StepsModule.css";
import { useEffect } from "react";
import { openDetailsByHash } from "../../../helpers/handlers";

const StepsModule = ({ steps }) => {
  useEffect(() => {
    window.addEventListener(`hashchange`, openDetailsByHash);
    openDetailsByHash();

    return () => {
      window.removeEventListener(`hashchange`, openDetailsByHash);
    };
  }, []);

  return (
    <div className="StepsModule">
      {steps.map((step, index) => {
        const tabId = `tab-${index + 1}`;
        return (
          <details key={step.id} id={tabId} open={index === 0}>
            <summary>
              <h3>
                <b>Step {index + 1}.</b> {step.question}
              </h3>
            </summary>
            {formatRichText(step.answer.raw)}
            <div className="Faq__actions">
              <div className="Faq__copy-action">
                <a
                  href={`#${tabId}`}
                  data-copied={getTranslatedText(`actions.copyLinkPopupLabel`)}
                  onClick={(e) => {
                    handleAnchorClick(e);
                  }}
                  className="copy"
                >
                  {getTranslatedText(`actions.copyLink`)}
                </a>
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
};

StepsModule.propTypes = StepsModulePropTypes;

StepsModule.defaultProps = StepsModuleDefaultProps;

export default StepsModule;
