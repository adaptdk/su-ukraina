import * as React from "react";
import { ChipPropTypes } from "./ChipModulePropTypes";

import "./ContactChip.css";

const ContactChip = ({ heading, subheading, links }) => {
  const getLabelByType = (type) => {
    if (type === `web`) {
      return `WWW`;
    }

    if (type === `facebook`) {
      return `Facebook`;
    }

    if (type === `twitter`) {
      return `Twitter`;
    }

    return null;
  };

  return (
    <article className="ContactChip">
      <div className="ContactChip__heading">
        <div className="ContactChip__title">{heading}</div>
        <div>{subheading}</div>
      </div>
      <div className="ContactChip__actions">
        {links.map((link) => {
          return (
            <a
              key={link.id}
              href={link.url}
              rel="noopener"
              className={`ContactChip__actions-${link.iconType}`}
              target="_blank"
            >
              {getLabelByType(link.iconType)}
            </a>
          );
        })}
      </div>
    </article>
  );
};

ContactChip.propTypes = ChipPropTypes;

export default ContactChip;
