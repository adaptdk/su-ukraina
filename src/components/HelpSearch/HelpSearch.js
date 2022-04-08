import * as React from "react";
import PropTypes from "prop-types";
import Linkify from "react-linkify";
import algoliasearch from "algoliasearch/lite";
import {
  connectStateResults,
  ClearRefinements,
  CurrentRefinements,
  Highlight,
  Hits,
  HitsPerPage,
  InstantSearch,
  Pagination,
  Panel,
  PoweredBy,
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom";
import qs from "qs";
import { navigate } from "gatsby";

import {
  POSSIBLE_SEARCH_LANGS,
  TRANSLATIONS,
} from "../../constants/HelpSearch";

import Button from "../Button";
import Constraint from "../Constraint";

import "instantsearch.css/themes/satellite.css";
import "./HelpSearch.css";

const DEBOUNCE_TIME = 400;
const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const Results = connectStateResults(
  ({ searchState, searchResults, children, language }) => {
    return searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div
        dangerouslySetInnerHTML={{
          __html: TRANSLATIONS.noResults[language].replace(
            `{query}`,
            `<strong>${searchState.query}</strong>`
          ),
        }}
      />
    );
  }
);

const SplitHitValue = ({ children }) => {
  return (
    <>
      {splitHitValueByNewlines(children).map((str, i) => {
        return (
          <p key={i}>
            <Linkify>{str}</Linkify>
          </p>
        );
      })}
    </>
  );
};

SplitHitValue.propTypes = {
  children: PropTypes.string,
};

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

const LangSwitcher = ({ resultsLang, handleSearchLangChange, name }) => {
  return (
    <div className="HelpSearch__LangSwitcher">
      <i>{TRANSLATIONS.langSwitcher.language[resultsLang]}</i>
      {POSSIBLE_SEARCH_LANGS.map((lang) => {
        return (
          <label key={lang} aria-label={lang.toUpperCase()}>
            <input
              checked={resultsLang === lang}
              name={name}
              onChange={handleSearchLangChange}
              type="radio"
              value={lang}
            />
            {` `}
            <span>
              {lang
                .toUpperCase()
                .replace(`LT`, `Lietuvių`)
                .replace(`RU`, `Русский`)
                .replace(`UK`, `Українська`)}
            </span>
            <span>{lang.toUpperCase()}</span>
          </label>
        );
      })}
    </div>
  );
};

LangSwitcher.propTypes = {
  name: PropTypes.string.isRequired,
  resultsLang: PropTypes.string,
  handleSearchLangChange: PropTypes.func,
};

const createURL = (state) => {
  return `?${qs.stringify(state)}`;
};

const searchStateToUrl = (searchState) => {
  return searchState ? createURL(searchState) : ``;
};

const urlToSearchState = ({ search }) => {
  return qs.parse(search.slice(1));
};

const HelpSearch = ({ defaultResultsLang }) => {
  const [searchState, setSearchState] = React.useState(
    typeof window === `undefined` ? {} : urlToSearchState(location)
  );
  const [resultsLang, setResultsLang] = React.useState(defaultResultsLang);

  const debouncedSetStateRef = React.useRef(null);

  const handleFiltersSensorChange = (e) => {
    if (typeof window === `undefined`) {
      return;
    }
    if (e.target.checked) {
      document.body.dataset.filters = `visible`;
    } else {
      document.body.removeAttribute(`data-filters`);
    }
  };

  const handleSearchLangChange = (event) => {
    if (event.target.value !== resultsLang) {
      setResultsLang(event.target.value);
    }
  };

  const HitWithCurrentLanguage = React.useMemo(() => {
    return getHitWithLanguage(resultsLang);
  }, [resultsLang]);

  const handleSearchStateChange = (updatedSearchState) => {
    clearTimeout(debouncedSetStateRef.current);

    debouncedSetStateRef.current = setTimeout(() => {
      navigate(searchStateToUrl(updatedSearchState));
    }, DEBOUNCE_TIME);

    setSearchState(updatedSearchState);
  };

  React.useEffect(
    () => {
      setSearchState(
        typeof window === `undefined` ? {} : urlToSearchState(location)
      );
    },
    typeof window === `undefined` ? [] : [location]
  );

  React.useEffect(() => {
    return () => {
      document.body.removeAttribute(`data-filters`);
    };
  }, []);

  return (
    <div className="HelpSearch">
      <InstantSearch
        indexName="Support"
        onSearchStateChange={handleSearchStateChange}
        searchClient={searchClient}
        searchState={searchState}
      >
        <div className="HelpSearch__header">
          <Constraint className="HelpSearch__header-content">
            <LangSwitcher
              handleSearchLangChange={handleSearchLangChange}
              name="header-lang-switcher"
              resultsLang={resultsLang}
            />
            <SearchBox
              translations={{
                placeholder: `${TRANSLATIONS.searchBox[resultsLang]}`,
              }}
            />
          </Constraint>
        </div>

        <Constraint className="HelpSearch__content">
          <div className="HelpSearch__body">
            <div className="HelpSearch__top-actions">
              <div className="HelpSearch__refinements">
                <CurrentRefinements
                  transformItems={(items) => {
                    return items.map((item) => {
                      return {
                        ...item,
                        label: `${
                          TRANSLATIONS.refinements[
                            item.attribute
                              .replace(/tags_../, `typeOfHelp`)
                              .replace(/region_../, `region`)
                              .replace(/languages_../, `languages`)
                          ][resultsLang]
                        }: `,
                      };
                    });
                  }}
                />
                <ClearRefinements
                  translations={{
                    reset: (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                        >
                          <g fill="none" fillRule="evenodd" opacity=".4">
                            <path d="M0 0h11v11H0z" />
                            <path
                              fill="#000"
                              fillRule="nonzero"
                              d="M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z"
                            />
                          </g>
                        </svg>
                        {TRANSLATIONS.refinements.clearFilters[resultsLang]}
                      </>
                    ),
                  }}
                />
              </div>

              <div className="HelpSearch__hits-per-page">
                <HitsPerPage
                  className="container-option"
                  items={[
                    {
                      label: `16 ${TRANSLATIONS.hitsPerPage[resultsLang]}`,
                      value: 16,
                    },
                    {
                      label: `32 ${TRANSLATIONS.hitsPerPage[resultsLang]}`,
                      value: 32,
                    },
                    {
                      label: `64 ${TRANSLATIONS.hitsPerPage[resultsLang]}`,
                      value: 64,
                    },
                  ]}
                  defaultRefinement={16}
                />
              </div>
            </div>

            <Results language={resultsLang}>
              <Hits
                hitComponent={HitWithCurrentLanguage}
                language={resultsLang}
              />
            </Results>

            <footer className="container-footer">
              <Pagination
                padding={2}
                showFirst={false}
                showLast={false}
                translations={{
                  previous: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                    >
                      <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.143"
                      >
                        <path d="M9 5H1M5 9L1 5l4-4" />
                      </g>
                    </svg>
                  ),
                  next: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                    >
                      <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.143"
                      >
                        <path d="M1 5h8M5 9l4-4-4-4" />
                      </g>
                    </svg>
                  ),
                }}
              />
            </footer>
            <div className="HelpSearch__footer-lang-switcher">
              <LangSwitcher
                handleSearchLangChange={handleSearchLangChange}
                name="footer-lang-switcher"
                resultsLang={resultsLang}
              />
            </div>
            <PoweredBy translations={{ searchBy: `` }} />
          </div>

          <input
            type="checkbox"
            name="filters-sensor"
            id="filters-sensor"
            onChange={handleFiltersSensorChange}
          />
          <label
            className="HelpSearch__filters-trigger"
            htmlFor="filters-sensor"
          >
            <Button
              className="HelpSearch__filters-trigger-button"
              color="secondary"
              pretend
            >
              {TRANSLATIONS.refinements.panelTitle[resultsLang]}
            </Button>
          </label>
          <label
            className="HelpSearch__sidebar-overlay"
            htmlFor="filters-sensor"
          />
          <div className="HelpSearch__sidebar">
            <p className="HelpSearch__sidebar-title">
              {TRANSLATIONS.refinements.panelTitle[resultsLang]}
            </p>
            <Panel header={TRANSLATIONS.refinements.typeOfHelp[resultsLang]}>
              <RefinementList attribute={`tags_${resultsLang}`} />
            </Panel>

            <Panel header={TRANSLATIONS.refinements.region[resultsLang]}>
              <RefinementList attribute={`region_${resultsLang}`} />
            </Panel>

            <Panel header={TRANSLATIONS.refinements.languages[resultsLang]}>
              <RefinementList attribute={`languages`} />
            </Panel>

            <div className="HelpSearch__sidebar-actions">
              <label
                className="HelpSearch__filters-close-trigger"
                htmlFor="filters-sensor"
              >
                <Button
                  className="HelpSearch__filters-close-trigger-button"
                  color="primary"
                  pretend
                >
                  {TRANSLATIONS.refinements.doFilter[resultsLang]}
                </Button>
              </label>
            </div>
          </div>
        </Constraint>
      </InstantSearch>
    </div>
  );
};

HelpSearch.propTypes = {
  defaultResultsLang: PropTypes.string.isRequired,
};

export default HelpSearch;
