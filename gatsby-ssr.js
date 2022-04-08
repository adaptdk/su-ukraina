import React from "react";
import { HeadProvider } from "react-head";

const HtmlAttributes = { lang: `lt` };

// Mutated during render.
let headTags = [];

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  const headComponents = [headTags];

  setHtmlAttributes(HtmlAttributes);

  headComponents.push(
    <script
      dangerouslySetInnerHTML={{
        __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
      }}
    />
  );

  if (process.env.NODE_ENV === `production`) {
    headComponents.push(
      <script
        defer
        data-api="https://s.suukraina.lt/api/event"
        data-domain="suukraina.lt"
        src="https://s.suukraina.lt/js/script.outbound-links.js"
      />
    );
  }

  setHeadComponents(headComponents);

  // Empty the headTags array for the next page.
  headTags.splice(0, headTags.length);
};

export const wrapRootElement = ({ element }) => {
  return <HeadProvider headTags={headTags}>{element}</HeadProvider>;
};
