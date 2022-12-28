import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import { HeroSection } from "../components/HeroSection";
import NavigationGroup from "../components/NavigationGroup";
import Constraint from "../components/Constraint";
import { FaqNav } from "../components/Faq";

import { formatRichText } from "../helpers/formatting";
import {
  gatsbyImagePropType,
  localePropType,
  navigationPropTypes,
  nodeSlugsPropTypes,
} from "../helpers/genericPropTypes";

const FaqIndexPage = ({ path, pageContext }) => {
  const {
    node_locale,
    navigation,
    metaTitle,
    metaDescription,
    heroImage,
    pageHeading,
    pageDescription,
    categories,
    rootPath,
    breadcrumb: { crumbs },
  } = pageContext;

  return (
    <Layout
      pagePath={path}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      navigation={navigation}
      locale={node_locale}
    >
      {heroImage && <HeroSection heroImage={heroImage} />}

      <Constraint>
        <NavigationGroup crumbs={crumbs} />
        {pageHeading && <h1>{pageHeading}</h1>}
        {pageDescription?.raw && formatRichText(pageDescription.raw)}
      </Constraint>

      {categories?.at(0) && (
        <Constraint>
          <FaqNav rootPath={rootPath} categories={categories} pathname={path} />
        </Constraint>
      )}
    </Layout>
  );
};

FaqIndexPage.propTypes = {
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
    rootPath: PropTypes.string.isRequired,
    metaTitle: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    heroImage: gatsbyImagePropType,
    pageHeading: PropTypes.string,
    pageDescription: PropTypes.shape({
      raw: PropTypes.string,
    }),
    // @TODO: fix this proptype
    categories: PropTypes.array,
  }),
};

FaqIndexPage.defaultProps = {
  pageTitle: ``,
  pageDescription: {
    raw: ``,
  },
  organisations: [],
  navData: [],
};

export default FaqIndexPage;
