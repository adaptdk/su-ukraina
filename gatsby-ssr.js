import React from "react";
import { HeadProvider } from "react-head";

const HtmlAttributes = { lang: `lt` };

// Mutated during render.
let headTags = [];

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes(HtmlAttributes);
  setHeadComponents(headTags);

  // Empty the headTags array for the next page.
  headTags.splice(0, headTags.length);
};

export const wrapRootElement = ({ element }) => {
  return <HeadProvider headTags={headTags}>{element}</HeadProvider>;
};
