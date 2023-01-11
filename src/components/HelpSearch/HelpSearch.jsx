import * as React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  connectStateResults,
  ClearRefinements,
  CurrentRefinements,
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

import { TRANSLATIONS } from "../../constants/HelpSearch";
import LangSwitcher from "./LangSwitcher";
import { getHitWithLanguage } from "./utils";

import Button from "../Button";
import Constraint from "../Constraint";

import "instantsearch.css/themes/satellite.css";
import "./HelpSearch.css";
import { HelpSearchPropTypes } from "./HelpSearchPropTypes";

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
  console.log({ defaultResultsLang });
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
              <RefinementList
                attribute={`tags_${resultsLang}`}
                limit={50}
                showMore={true}
              />
            </Panel>

            <Panel header={TRANSLATIONS.refinements.region[resultsLang]}>
              <RefinementList
                attribute={`region_${resultsLang}`}
                limit={50}
                showMore={true}
              />
            </Panel>

            <Panel header={TRANSLATIONS.refinements.languages[resultsLang]}>
              <RefinementList
                attribute={`languages`}
                limit={50}
                showMore={true}
              />
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

HelpSearch.propTypes = HelpSearchPropTypes;

export default HelpSearch;
