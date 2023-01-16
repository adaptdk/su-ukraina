import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

export const formatRichText = (str, options = {}) => {
  const content = JSON.parse(str);
  return documentToReactComponents(content, options);
};

export const removeParagraphsFromRichText = (content) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => children,
    },
  };

  return formatRichText(content, options);
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const kebabCaseToTitleCase = (str) => {
  return toTitleCase(str).replace(/[-]/g, ` `);
};
