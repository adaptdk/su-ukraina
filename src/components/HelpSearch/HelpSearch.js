import * as React from "react";
import PropTypes from "prop-types";
import Linkify from "react-linkify";
import algoliasearch from "algoliasearch/lite";
import {
  ClearRefinements,
  CurrentRefinements,
  Highlight,
  Hits,
  HitsPerPage,
  InstantSearch,
  // NoResults,
  Pagination,
  Panel,
  PoweredBy,
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom";
import qs from "qs";
import { navigate } from "gatsby";

import Constraint from "../Constraint";

import "instantsearch.css/themes/satellite.css";
import "./HelpSearch.css";

const DEBOUNCE_TIME = 400;
const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const getHitWithLanguage = (language) => {
  const Hit = ({ hit }) => {
    const address = hit[`address_${language}`];
    const contacts = hit[`contacts_${language}`];
    const region = hit[`region_${language}`];
    const urls = hit[`url_${language}`].filter((url) => {
      return !!url;
    });
    const workingHours = hit[`workingHours_${language}`];

    return (
      <article className="Hit">
        <p className="HelpSearch__Hit-title">
          <Highlight attribute={`title_${language}`} tagName="mark" hit={hit} />
        </p>
        {!!hit.languages.length && (
          <Panel header={TRANSLATIONS.hit.languages[language]}>
            <ul className="HelpSearch__Hit-languages">
              {hit.languages.map((lang) => {
                return <li key={lang}>{lang}</li>;
              })}
            </ul>
          </Panel>
        )}
        <Panel header={TRANSLATIONS.hit.tags[language]}>
          <ul className="HelpSearch__Hit-tags">
            {hit[`tags_${language}`].map((tag) => {
              return <li key={tag}>{tag}</li>;
            })}
          </ul>
        </Panel>
        <Panel header={TRANSLATIONS.hit.purpose[language]}>
          <Highlight
            attribute={`purpose_${language}`}
            tagName="mark"
            hit={hit}
          />
        </Panel>
        {!!address && (
          <Panel header={TRANSLATIONS.hit.address[language]}>{address}</Panel>
        )}
        {!!contacts && (
          <Panel header={TRANSLATIONS.hit.contacts[language]}>
            <Linkify>{contacts}</Linkify>
          </Panel>
        )}
        {!!region && (
          <Panel header={TRANSLATIONS.hit.region[language]}>{region}</Panel>
        )}
        {!!workingHours && (
          <Panel header={TRANSLATIONS.hit.workingHours[language]}>
            {workingHours}
          </Panel>
        )}
        {!!urls.length && (
          <Panel header="URLs">
            {urls.map((url, i) => {
              return (
                <a href={url} key={i} target="_blank" rel="noreferrer noopener">
                  {url}
                </a>
              );
            })}
          </Panel>
        )}
        {/*<Snippet attribute="" tagName="mark" hit={hit} />*/}
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
    }),
  };

  return Hit;
};

const POSSIBLE_SEARCH_LANGS = [`lt`, `ru`, `uk`];

const TRANSLATIONS = {
  hit: {
    _template: {
      lt: ``,
      ru: ``,
      uk: ``,
    },
    address: {
      lt: `Adresas`,
      ru: `Aдрес`,
      uk: `Адреса`,
    },
    contacts: {
      lt: `Kontaktai`,
      ru: `Kонтакты`,
      uk: `Контакти`,
    },
    languages: {
      lt: `Kalba`,
      ru: `Язык`,
      uk: `Мова`,
    },
    purpose: {
      lt: `Aprašymas`,
      ru: `Дополнительная информация`,
      uk: `Додаткова інформація`,
    },
    region: {
      lt: `Vieta`,
      ru: `Место нахождения`,
      uk: `Місцезнаходження`,
    },
    tags: {
      lt: `Pagalbos rūšis`,
      ru: `Тип помощи`,
      uk: `Вид допомоги`,
    },
    workingHours: {
      lt: `Darbo laikas`,
      ru: `Время работы`,
      uk: `Час роботи`,
    },
  },
  langSwitcher: {
    language: {
      lt: `Kalba`,
      ru: `Язык`,
      uk: `Мова`,
    },
  },
  refinements: {
    languages: {
      lt: `Kalba`,
      ru: `Язык`,
      uk: `Мова`,
    },
    region: {
      lt: `Vieta`,
      ru: `Место нахождения`,
      uk: `Місцезнаходження`,
    },
    typeOfHelp: {
      lt: `Pagalbos rūšis`,
      ru: `Тип помощи`,
      uk: `Вид допомоги`,
    },
  },
  searchBox: {
    lt: `Paieška`,
    ru: `Поиск`,
    uk: `Пошук`,
  },
};

const LangSwitcher = ({ resultsLang, handleSearchLangChange, name }) => {
  return (
    <div>
      {TRANSLATIONS.langSwitcher.language[resultsLang]}
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
            {lang
              .toUpperCase()
              .replace(`LT`, `🇱🇹`)
              .replace(`RU`, `🇷🇺`)
              .replace(`UK`, `🇺🇦`)}
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

const HelpSearch = () => {
  const [searchState, setSearchState] = React.useState(
    urlToSearchState(location)
  );
  const [resultsLang, setResultsLang] = React.useState(
    POSSIBLE_SEARCH_LANGS[0]
  );

  const debouncedSetStateRef = React.useRef(null);

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

  React.useEffect(() => {
    setSearchState(urlToSearchState(location));
  }, [location]);

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
            <SearchBox
              translations={{
                placeholder: `${TRANSLATIONS.searchBox[resultsLang]} 🇱🇹 🇷🇺 🇺🇦`,
              }}
            />
            <PoweredBy translations={{ searchBy: `` }} />
            <LangSwitcher
              handleSearchLangChange={handleSearchLangChange}
              name="header-lang-switcher"
              resultsLang={resultsLang}
            />
          </Constraint>
        </div>

        <Constraint className="HelpSearch__content">
          <div className="HelpSearch__body">
            <div className="HelpSearch__top-actions">
              <div className="HelpSearch__refinements">
                <CurrentRefinements />
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
                        Clear filters
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
                      label: `16 hits per page`,
                      value: 16,
                    },
                    {
                      label: `32 hits per page`,
                      value: 32,
                    },
                    {
                      label: `64 hits per page`,
                      value: 64,
                    },
                  ]}
                  defaultRefinement={16}
                />
              </div>
            </div>

            <Hits
              hitComponent={HitWithCurrentLanguage}
              language={resultsLang}
            />
            {/* <NoResults /> */}

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
            <p style={{ background: `#fff`, position: `sticky`, bottom: 0 }}>
              <LangSwitcher
                handleSearchLangChange={handleSearchLangChange}
                name="footer-lang-switcher"
                resultsLang={resultsLang}
              />
            </p>
          </div>

          <div className="HelpSearch__sidebar">
            <Panel header={TRANSLATIONS.refinements.typeOfHelp[resultsLang]}>
              <RefinementList attribute={`tags_${resultsLang}`} />
            </Panel>

            <Panel header={TRANSLATIONS.refinements.region[resultsLang]}>
              <RefinementList attribute={`region_${resultsLang}`} />
            </Panel>

            <Panel header={TRANSLATIONS.refinements.languages[resultsLang]}>
              <RefinementList attribute={`languages`} />
            </Panel>
          </div>
        </Constraint>
      </InstantSearch>
    </div>
  );
};

export default HelpSearch;
