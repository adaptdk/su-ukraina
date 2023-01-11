import React from "react";
import PropTypes from "prop-types";

import { Highlight, Panel } from "react-instantsearch-dom";

import { TRANSLATIONS } from "../../constants/HelpSearch";
import SplitHitValue from "./SplitHitValue";

const splitHitValueByNewlines = (str) => {
  return str
    .split(/<br\s*\/?>/) /* <br> or <br/> or <br />, etc */
    .join(`\n`)
    .split(/\n+/);
};

const getHitWithLanguage = (language) => {
  const Hit = ({ hit }) => {
    const addresses = hit[`addresses_${language}`];
    const regions = hit[`regions_${language}`];
    const urls = hit[`url_${language}`].filter((url) => {
      return !!url;
    });
    const workingHours = hit[`workingHours_${language}`];
    const phones = hit[`phones_${language}`] ?? [];
    const emails = hit[`emails_${language}`] ?? [];

    const purposeHighlights = splitHitValueByNewlines(
      hit._highlightResult[`purpose_${language}`].value
    ).map((highlightValuePart, i) => {
      return (
        <p key={i}>
          <Highlight
            attribute={`purpose_${language}`}
            tagName="mark"
            hit={{
              _highlightResult: {
                [`purpose_${language}`]: {
                  ...hit._highlightResult[`purpose_${language}`],
                  value: highlightValuePart,
                },
              },
            }}
          />
        </p>
      );
    });

    return (
      <article className="HelpSearch__Hit">
        <div className="HelpSearch__Hit-header">
          <p className="HelpSearch__Hit-title">
            <Highlight
              attribute={`title_${language}`}
              tagName="mark"
              hit={hit}
            />
          </p>
          {!!hit.languages.length && (
            <ul className="HelpSearch__Hit-languages">
              {hit.languages.map((lang) => {
                return <li key={lang}>{lang}</li>;
              })}
            </ul>
          )}
        </div>
        <ul className="HelpSearch__Hit-tags">
          {hit[`tags_${language}`].map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
        <Panel header={TRANSLATIONS.hit.purpose[language]}>
          {purposeHighlights}
        </Panel>
        {!!addresses?.length && (
          <Panel header={TRANSLATIONS.hit.address[language]}>
            {addresses
              .map((address, i) => {
                const sanitizedAddress = address.trim();
                let href;
                if (
                  // Check if URL
                  sanitizedAddress.match(
                    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi
                  )
                ) {
                  // Check if there's a protocol defined
                  if (sanitizedAddress.match(/^\w*:*\/\//)) {
                    href = sanitizedAddress;
                  } else {
                    href = `https://${sanitizedAddress}`;
                  }
                } else {
                  href = `https://www.google.com/maps/place/${sanitizedAddress}`;
                }
                href = encodeURI(href);
                return (
                  <a href={href} target="_blank" rel="noopener" key={i}>
                    {sanitizedAddress}
                  </a>
                );
              })
              .reduce((prev, curr) => {
                return prev === null ? [curr] : [...prev, `, `, curr];
              }, null)}
          </Panel>
        )}
        {!!(phones.length || emails.length) && (
          <Panel header={TRANSLATIONS.hit.contacts[language]}>
            {[
              ...phones.map((phone, i) => {
                return (
                  <a
                    href={`tel:${phone.replace(/\s+/g, ``)}`}
                    key={`email-${i}`}
                  >
                    {phone}
                  </a>
                );
              }),
              ...emails.map((email, i) => {
                return (
                  <a href={`mailto:${email}`} key={`phone-${i}`}>
                    {email}
                  </a>
                );
              }),
            ].reduce((prev, curr) => {
              return prev === null ? [curr] : [...prev, `, `, curr];
            }, null)}
          </Panel>
        )}
        {!!regions?.length && (
          <Panel header={TRANSLATIONS.hit.region[language]}>
            {regions
              .map((region, i) => {
                return <span key={i}>{region}</span>;
              })
              .reduce((prev, curr) => {
                return prev === null ? [curr] : [...prev, `, `, curr];
              }, null)}
          </Panel>
        )}
        {!!workingHours && (
          <Panel header={TRANSLATIONS.hit.workingHours[language]}>
            <SplitHitValue>{workingHours}</SplitHitValue>
          </Panel>
        )}
        {!!urls.length && (
          <Panel header="URLs">
            {urls.map((url, i) => {
              return (
                <a href={url} key={i} target="_blank" rel="noopener">
                  {url}
                </a>
              );
            })}
          </Panel>
        )}
      </article>
    );
  };

  Hit.propTypes = {
    hit: PropTypes.shape({
      address_lt: PropTypes.string,
      address_ru: PropTypes.string,
      address_uk: PropTypes.string,
      contacts_lt: PropTypes.string,
      contacts_ru: PropTypes.string,
      contacts_uk: PropTypes.string,
      purpose_lt: PropTypes.string,
      purpose_ru: PropTypes.string,
      purpose_uk: PropTypes.string,
      region_lt: PropTypes.string,
      region_ru: PropTypes.string,
      region_uk: PropTypes.string,
      tags_lt: PropTypes.arrayOf(PropTypes.string),
      tags_ru: PropTypes.arrayOf(PropTypes.string),
      tags_uk: PropTypes.arrayOf(PropTypes.string),
      title_lt: PropTypes.string,
      title_ru: PropTypes.string,
      title_uk: PropTypes.string,
      url_lt: PropTypes.arrayOf(PropTypes.string),
      url_ru: PropTypes.arrayOf(PropTypes.string),
      url_uk: PropTypes.arrayOf(PropTypes.string),
      workingHours_lt: PropTypes.string,
      workingHours_ru: PropTypes.string,
      workingHours_uk: PropTypes.string,
      objectID: PropTypes.string,
      languages: PropTypes.arrayOf(PropTypes.string),
      _highlightResult: PropTypes.shape({
        purpose_lt: PropTypes.shape({
          value: PropTypes.string,
        }),
      }),
    }),
  };

  return Hit;
};

export { getHitWithLanguage, splitHitValueByNewlines };
