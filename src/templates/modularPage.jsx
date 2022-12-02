import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import HeroSection, { HeroSectionPropTypes } from "../components/HeroSection";
import Constraint from "../components/Constraint";
import NavigationGroup from "../components/NavigationGroup";

import { seoPropTypes } from "../helpers/genericPropTypes";
import { formatRichText } from "../helpers/formatting";
import {
  ContentfulModule,
  ContentfulModulePropTypes,
} from "../components/ContentfulModule";

const ModularPage = ({ path, pageContext }) => {
  const {
    seo,
    hero,
    pageHeading,
    pageDescription,
    modules,
    breadcrumb: { crumbs },
  } = pageContext;

  return (
    <Layout pagePath={path} seo={seo}>
      {hero && <HeroSection {...hero} />}

      <Constraint>
        <NavigationGroup crumbs={crumbs} />
        {pageHeading && <h1>{pageHeading}</h1>}
        {pageDescription?.raw && formatRichText(pageDescription.raw)}
      </Constraint>

      {!!modules.at(0) &&
        modules.map((module) => {
          return <ContentfulModule key={module.id} module={module} />;
        })}
    </Layout>
  );
};

ModularPage.propTypes = {
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    breadcrumb: PropTypes.shape({
      crumbs: PropTypes.arrayOf(
        PropTypes.shape({
          pathname: PropTypes.string.isRequired,
          crumbLabel: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    seo: PropTypes.shape(seoPropTypes).isRequired,
    hero: PropTypes.shape(HeroSectionPropTypes),
    pageHeading: PropTypes.string,
    pageDescription: PropTypes.shape({
      raw: PropTypes.string,
    }),
    modules: PropTypes.arrayOf(ContentfulModulePropTypes),
  }),
};

ModularPage.defaultProps = {
  pageTitle: ``,
  pageDescription: {
    raw: ``,
  },
  organisations: [],
};

export default ModularPage;
