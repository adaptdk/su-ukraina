import * as React from "react";
import { Title, Meta } from "react-head";
import algoliasearch from "algoliasearch/lite";
import {
  Hits,
  InstantSearch,
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom";

import Layout from "../components/Layout";

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const Page = () => {
  return (
    <Layout>
      <Title>Pagalba</Title>
      <Meta
        name="description"
        content="Sąrašas iniciatyvų vykdomų Lietuvoje, kurios skirtos pagelbėti Ukrainos žmonėms"
      />
      <p>{process.env.ALGOLIA_APP_ID}</p>
      <InstantSearch indexName="Support" searchClient={searchClient}>
        <SearchBox />

        <RefinementList
          attribute="tags_lt"
          searchable={true}
          translations={{
            placeholder: `Pagalbos rūšis…`,
          }}
        />

        <RefinementList
          attribute="region_lt"
          searchable={true}
          translations={{
            placeholder: `Vieta…`,
          }}
        />

        <Hits />
      </InstantSearch>
    </Layout>
  );
};

export default Page;
