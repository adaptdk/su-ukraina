import React from "react";
import { HeadProvider } from "react-head";

const HtmlAttributes = { lang: `lt` };

// Mutated during render.
let headTags = [];

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  const headComponents = [headTags];

  setHtmlAttributes(HtmlAttributes);

  if (process.env.NODE_ENV === `production`) {
    headComponents.push(
      <script
        defer
        data-domain="suukraina.lt"
        src="https://plausible.io/js/script.outbound-links.js"
      />
    );
    headComponents.push(
      <script
        dangerouslySetInnerHTML={{
          __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
        }}
      />
    );

    if (process.env.POSTHOG_KEY) {
      headComponents.push(
        <script
          key="posthog-script"
          dangerouslySetInnerHTML={{
            __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('${process.env.POSTHOG_KEY}',{api_host:'https://app.posthog.com'});
document.addEventListener("click",function(t){for(var e=t.target;e&&(void 0===e.tagName||"a"!=e.tagName.toLowerCase()||!e.href);)e=e.parentNode;e&&e.href&&e.host&&e.host!==location.host&&(posthog.capture("Outbound link",{href:e.href,location:location}),e.target&&!e.target.match(/^_(self|parent|top)$/i)||(setTimeout(function(){location.href=e.href},150),t.preventDefault()))})`,
          }}
        />
      );
    }
  }

  setHeadComponents(headComponents);

  // Empty the headTags array for the next page.
  headTags.splice(0, headTags.length);
};

export const wrapRootElement = ({ element }) => {
  return <HeadProvider headTags={headTags}>{element}</HeadProvider>;
};
