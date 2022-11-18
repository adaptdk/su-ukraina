import * as React from "react";
import { Meta } from "react-head";

import HelpSearch from "../../components/HelpSearch";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { LANG_UK } from "../../constants/HelpSearch";

const Page = () => {
  return (
    <Layout noStickyHeader>
      <PageTitle title="Послуги" />
      <Meta
        name="description"
        content="Sąrašas iniciatyvų vykdomų Lietuvoje, kurios skirtos pagelbėti Ukrainos žmonėms"
      />
      <HelpSearch defaultResultsLang={LANG_UK} />
    </Layout>
  );
};

export default Page;
