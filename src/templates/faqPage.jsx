import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import { HeroSection } from "../components/HeroSection";

import { Faq, FaqNavDataPropTypes } from "../components/Faq";
import { FaqModulePropTypes } from "../components/Faq/FaqModule/FaqModulePropTypes";
import {
  gatsbyImagePropType,
  localePropType,
  navigationPropTypes,
  nodeSlugsPropTypes,
} from "../helpers/genericPropTypes";

const FaqPage = ({ path, pageContext }) => {
  const {
    currentNodeSlugs,
    node_locale,
    navigation,
    metaTitle,
    metaDescription,
    heroImage,
    pageHeading,
    pageDescription,
    content,
    navData,
    breadcrumb: { crumbs },
  } = pageContext;
  return (
    <Layout
      pagePath={path}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      navigation={navigation}
      locale={node_locale}
      currentNodeSlugs={currentNodeSlugs}
    >
      {heroImage && <HeroSection heroImage={heroImage} />}

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
    currentNodeSlugs: nodeSlugsPropTypes.isRequired,
    navigation: navigationPropTypes.isRequired,
    node_locale: localePropType.isRequired,
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    metaTitle: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    heroImage: gatsbyImagePropType,
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
