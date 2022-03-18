import * as React from "react";
import PropTypes from "prop-types";
import { Title, Meta } from "react-head";
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
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom";

import Layout from "../components/Layout";

import "instantsearch.css/themes/satellite.css";

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
        <Highlight attribute={`title_${language}`} tagName="mark" hit={hit} />
        {!!hit.languages.length && (
          <ul>
            {hit.languages.map((lang) => {
              return <li key={lang}>{lang}</li>;
            })}
          </ul>
        )}
        <p>Tags: {hit[`tags_${language}`].join(`, `)}</p>
        <Panel header="Aprašymas">
          <p>
            <Highlight
              attribute={`purpose_${language}`}
              tagName="mark"
              hit={hit}
            />
          </p>
        </Panel>
        {!!address && <Panel header="Adresas">{address}</Panel>}
        {!!contacts && (
          <Panel header="Kontaktai">
            <Linkify>{contacts}</Linkify>
          </Panel>
        )}
        {!!region && <Panel header="Miestas">{region}</Panel>}
        {!!workingHours && (
          <Panel header="Darbo valandos">{workingHours}</Panel>
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

const Page = () => {
  const [resultsLang, setResultsLang] = React.useState(
    POSSIBLE_SEARCH_LANGS[0]
  );

  const handleSearchLangChange = (event) => {
    if (event.target.value !== resultsLang) {
      setResultsLang(event.target.value);
    }
  };

  const HitWithCurrentLanguage = React.useMemo(() => {
    return getHitWithLanguage(resultsLang);
  }, [resultsLang]);

  return (
    <Layout>
      <Title>Pagalba</Title>
      <Meta
        name="description"
        content="Sąrašas iniciatyvų vykdomų Lietuvoje, kurios skirtos pagelbėti Ukrainos žmonėms"
      />
      <InstantSearch indexName="Support" searchClient={searchClient}>
        <SearchBox
          translations={{ placeholder: `Search here… (🇱🇹, 🇷🇺, 🇺🇦)` }}
        />

        <Panel header="Pagalbos rūšis">
          <RefinementList attribute="tags_lt" />
        </Panel>

        <Panel header="Miestas">
          <RefinementList attribute="region_lt" />
        </Panel>

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

        <Hits hitComponent={HitWithCurrentLanguage} language={resultsLang} />
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
          Switch results lang:
          {POSSIBLE_SEARCH_LANGS.map((lang) => {
            return (
              <label key={lang} aria-label={lang.toUpperCase()}>
                <input
                  checked={resultsLang === lang}
                  name="resultsLang"
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
        </p>
      </InstantSearch>
    </Layout>
  );
};

export default Page;
