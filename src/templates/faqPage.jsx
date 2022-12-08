import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import { HeroSection, HeroSectionPropTypes } from "../components/HeroSection";

import { seoPropTypes } from "../helpers/genericPropTypes";
import { Faq, FaqNavDataPropTypes } from "../components/Faq";
import { FaqModulePropTypes } from "../components/Faq/FaqModule/FaqModulePropTypes";

const FaqPage = ({ path, pageContext }) => {
  const {
    seo,
    hero,
    pageHeading,
    pageDescription,
    content,
    navData,
    breadcrumb: { crumbs },
  } = pageContext;
  console.log({ pageContext });
  return (
    <Layout pagePath={path} seo={seo}>
      {hero && <HeroSection {...hero} />}

      <Faq
        title={pageHeading}
        description={pageDescription}
        navData={navData}
        content={content}
        crumbs={crumbs}
      />
    </Layout>
  );
};

FaqPage.propTypes = {
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
    navData: PropTypes.arrayOf(PropTypes.shape(FaqNavDataPropTypes)),
    content: PropTypes.arrayOf(FaqModulePropTypes),
  }),
};

FaqPage.defaultProps = {
  pageTitle: ``,
  pageDescription: {
    raw: ``,
  },
  organisations: [],
  navData: [],
};

export default FaqPage;
