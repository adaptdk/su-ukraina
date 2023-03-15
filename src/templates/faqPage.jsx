import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import { HeroSection } from "../components/HeroSection";

import { Faq, FaqModulePropTypes } from "../components/Faq";
import { FaqCategoriesPropType } from "../components/Faq/FaqPropTypes";
import {
  gatsbyImagePropType,
  localePropType,
  navigationPropTypes,
  promoLinePropTypes,
} from "../helpers/genericPropTypes";
import { graphql } from "gatsby";

const FaqPage = ({ data, path, pageContext }) => {
  const {
    locale,
    rootPath,
    breadcrumb: { crumbs },
  } = pageContext;
  const {
    contentfulNavigation: navigation,
    contentfulPromoLineModule: promoLine,
    contentfulFaqPage: { categories },
    contentfulFaqCategory: {
      metaTitle,
      metaDescription,
      heroImage,
      pageHeading,
      pageDescription,
      content,
    },
  } = data;

  return (
    <Layout
      pagePath={path}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      navigation={navigation}
      locale={locale}
      promoLine={promoLine}
    >
      {heroImage && <HeroSection heroImage={heroImage} />}

      <Faq
        title={pageHeading}
        description={pageDescription}
        categories={categories}
        pathname={path}
        rootPath={rootPath}
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
    locale: localePropType.isRequired,
    rootPath: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    contentfulNavigation: navigationPropTypes.isRequired,
    contentfulPromoLineModule: promoLinePropTypes,
    contentfulFaqCategory: PropTypes.shape({
      metaTitle: PropTypes.string.isRequired,
      metaDescription: PropTypes.string.isRequired,
      heroImage: gatsbyImagePropType,
      pageHeading: PropTypes.string,
      pageDescription: PropTypes.shape({
        raw: PropTypes.string,
      }),
      content: PropTypes.arrayOf(PropTypes.shape(FaqModulePropTypes)),
    }),
    contentfulFaqPage: PropTypes.shape({
      categories: FaqCategoriesPropType.isRequired,
    }),
  }),
};

FaqPage.defaultProps = {
  pageTitle: ``,
  pageDescription: {
    raw: ``,
  },
  organisations: [],
};

export default FaqPage;

export const modularPageQuery = graphql`
  query (
    $pageId: String
    $categoryId: String
    $navigationId: String
    $locale: String
    $promoLineId: String
    $node_locale: String
  ) {
    # Global Navigation
    contentfulNavigation(
      contentful_id: { eq: $navigationId }
      node_locale: { eq: $locale }
    ) {
      ...NavigationFragment
    }

    # Global Promo Line
    contentfulPromoLineModule(
      contentful_id: { eq: $promoLineId }
      node_locale: { eq: $locale }
    ) {
      ...PromoLineFragment
    }

    # Faq Page (all categories for faq nav)
    contentfulFaqPage(
      contentful_id: { eq: $pageId }
      node_locale: { eq: $node_locale }
    ) {
      categories {
        ... on ContentfulFaqCategory {
          id
          slug
          pageHeading
        }
      }
    }

    # Faq Category
    contentfulFaqCategory(
      contentful_id: { eq: $categoryId }
      node_locale: { eq: $node_locale }
    ) {
      pageHeading
      pageDescription {
        raw
      }
      metaTitle
      metaDescription
      heroImage {
        gatsbyImageData(
          width: 1440
          height: 148
          placeholder: BLURRED
          formats: WEBP
          layout: FULL_WIDTH
        )
      }
      content {
        ... on Node {
          id
          internal {
            type
          }
          ...FaqItemFragment
          ...ResourceListModuleFragment
        }
      }
    }
  }
`;
