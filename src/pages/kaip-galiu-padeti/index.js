import * as React from "react";
import { Link } from "gatsby";

import Layout from "../../components/Layout";

const Page = () => {
  return (
    <Layout>
      <title>Kaip galiu padėti?</title>
      <Link to="aukojimas">Aukojimas</Link>
      <Link to="savanoryste">Savanorystė</Link>
    </Layout>
  );
};

export default Page;
