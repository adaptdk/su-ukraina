import { graphql } from "gatsby";
import * as React from "react";
import { ChipPropTypes } from "./ChipModulePropTypes";

import "./ContactChip.css";

const ContactChip = ({
  heading,
  subheading,
  webUrl,
  facebookUrl,
  twitterUrl,
}) => {
  if (!heading) {
    return null;
  }

  const links = [
    {
      url: webUrl,
      iconType: `web`,
      label: `WWW`,
    },
    {
      url: facebookUrl,
      iconType: `facebook`,
      label: `Facebook`,
    },
    {
      url: twitterUrl,
      iconType: `twitter`,
      label: `Twitter`,
    },
  ];

  return (
    <article className="ContactChip">
      <div className="ContactChip__heading">
        <div className="ContactChip__title">{heading}</div>
        <div>{subheading}</div>
      </div>
      <div className="ContactChip__actions">
        {links.map((link, index) => {
          if (link.url) {
            return (
              <a
                key={index}
                href={link.url}
                rel="noopener"
                className={`ContactChip__actions-${link.iconType}`}
                target="_blank"
              >
                {link.label}
              </a>
            );
          }
        })}
      </div>
    </article>
  );
};

ContactChip.propTypes = ChipPropTypes;

export default ContactChip;

export const query = graphql`
  fragment ChipFragment on ContentfulChip {
    id
    heading
    subheading
    webUrl
    facebookUrl
    twitterUrl
  }
`;
