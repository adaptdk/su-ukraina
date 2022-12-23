import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";
import { formatRichText } from "../../../../helpers/formatting";
import { FaqItemPropTypes } from "./FaqItemPropTypes";
import { getTranslatedText } from "../../../../utils/getTranslatedText";
import { handleAnchorClick } from "./faqItemUtils";
import { ContentfulModule } from "../../../ContentfulModule";
import { getRichTextModuleData } from "../../../../helpers/handlers";

const formatContent = (str, refs) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p>{children}</p>;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const moduleData = getRichTextModuleData(node, refs);
        if (moduleData) {
          return <ContentfulModule module={moduleData} />;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const moduleData = getRichTextModuleData(node, refs);
        if (moduleData) {
          return <ContentfulModule module={moduleData} />;
        }
      },
    },
  };

  return formatRichText(str, options);
};

const FaqItem = ({ answer, question, index }) => {
  const tabId = `tab-${index}`;
  return (
    <div className="Faq__question" id={tabId}>
      <details>
        <summary>
          <div className="Faq__summary">
            <h2>{question}</h2>
          </div>
        </summary>
        <div className="Faq__answer">
          {formatContent(answer.raw, answer.references)}
        </div>

        <div className="Faq__actions">
          <div className="Faq__copy-action">
            <a
              href={`#${tabId}`}
              data-copied="Скопійовано"
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
    </div>
  );
};

FaqItem.propTypes = FaqItemPropTypes;

export default FaqItem;
