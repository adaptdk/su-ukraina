import * as React from "react";
import { Meta } from "react-head";

import HelpSearch from "../components/HelpSearch";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { LANG_LT } from "../constants/HelpSearch";

const Page = () => {
  return (
    <Layout noStickyHeader>
      <PageTitle title="Pagalba Ukrainai ir jos piliečiams" />
      <Meta
        name="description"
        content="Pagalba Ukrainai ir jos piliečiams. Parama daiktais, pinigais, savanorystės galimybės. Svarbiausi šaltiniai ir kontaktai. Kviečiame padėti ➔"
      />
      <HelpSearch defaultResultsLang={LANG_LT} />
    </Layout>
  );
};

export default Page;
