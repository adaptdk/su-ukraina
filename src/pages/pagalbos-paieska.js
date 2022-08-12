import * as React from "react";
import { Title, Meta } from "react-head";

import HelpSearch from "../components/HelpSearch";
import Layout from "../components/Layout";
import { LANG_LT } from "../constants/HelpSearch";

const Page = () => {
  return (
    <Layout noStickyHeader>
      <Title>Pagalba Ukrainai ir jos piliečiams 🇺🇦 Suukraina.lt</Title>
      <Meta
        name="description"
        content="Pagalba Ukrainai ir jos piliečiams. Parama daiktais, pinigais, savanorystės galimybės. Svarbiausi šaltiniai ir kontaktai. Kviečiame padėti ➔"
      />
      <HelpSearch defaultResultsLang={LANG_LT} />
    </Layout>
  );
};

export default Page;
