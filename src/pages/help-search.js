import * as React from "react";
import { Title, Meta } from "react-head";

import HelpSearch from "../components/HelpSearch";
import Layout from "../components/Layout";
import { LANG_UK } from "../constants/HelpSearch";

const Page = () => {
  return (
    <Layout noStickyHeader>
      <Title>Pagalba</Title>
      <Meta
        name="description"
        content="Sąrašas iniciatyvų vykdomų Lietuvoje, kurios skirtos pagelbėti Ukrainos žmonėms"
      />
      <HelpSearch defaultResultsLang={LANG_UK} />
    </Layout>
  );
};

export default Page;
