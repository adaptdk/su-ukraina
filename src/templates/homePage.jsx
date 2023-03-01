import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import {
  gatsbyImagePropType,
  localePropType,
  navigationPropTypes,
  promoLinePropTypes,
} from "../helpers/genericPropTypes";

import Layout from "../components/Layout";
import Section from "../components/Section";
import HeroBanner from "../components/HeroBanner";
import Button from "../components/Button";
import {
  ContentfulModule,
  ContentfulModulePropTypes,
} from "../components/ContentfulModule";
import Constraint from "../components/Constraint";
import CtaCard from "../components/CtaCard";
import PromoLine from "../components/PromoLine";
import { graphql } from "gatsby";

const HomePage = ({ data, path, pageContext }) => {
  const { locale } = pageContext;
  const {
    contentfulNavigation,
    contentfulPromoLineModule: promoLine,
    contentfulHomepage: {
      metaTitle,
      metaDescription,
      heroImage,
      heroTitle,
      heroDescription,
      heroCtaCards,
      modules,
    },
  } = data;

  const isLt = locale === `lt-LT`;

  return (
    <Layout
      pagePath={path}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      navigation={contentfulNavigation}
      locale={locale}
      promoLine={promoLine}
      isHomepage={true}
    >
      {heroImage && (
        <Section className="HeroSection">
          <GatsbyImage
            className="HeroSection__background"
            image={getImage(heroImage)}
            alt=""
          />
          <HeroBanner title={heroTitle} subtitle={heroDescription}>
            <Constraint className="HeroBanner__inner">
              {heroCtaCards?.at(0) &&
                heroCtaCards.map((item) => {
                  return (
                    <CtaCard
                      key={item.id}
                      title={item.label}
                      link={item.url}
                      iconHandle={item.iconType}
                    />
                  );
                })}
            </Constraint>
          </HeroBanner>
        </Section>
      )}

      {/* @todo: move promoLine to modules */}
      {promoLine && isLt && (
        <Section className="PromoLineSection">
          <PromoLine
            title={promoLine?.heading}
            titleLink={promoLine?.titleLink}
            subtitle={promoLine?.subheading}
            large={true}
          >
            {promoLine?.linkButtons?.at(0) &&
              promoLine?.linkButtons.map((item) => {
                return (
                  <Button
                    key={item.id}
                    endIcon={`arrow-blue`}
                    to={item.url}
                    color={`secondary`}
                    target="_blank"
                    rel="noopener"
                  >
                    {item.label}
                    {item?.sublabel && <span>{item.sublabel}</span>}
                  </Button>
                );
              })}
          </PromoLine>
        </Section>
      )}

      {!!modules?.at(0) &&
        modules.map((module) => {
          return (
            <ContentfulModule key={module.id} module={module} pathname={path} />
          );
        })}
    </Layout>
  );
};

HomePage.propTypes = {
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    locale: localePropType.isRequired,
  }),
  data: PropTypes.shape({
    contentfulNavigation: navigationPropTypes.isRequired,
    contentfulPromoLineModule: promoLinePropTypes,
    contentfulHomepage: PropTypes.shape({
      metaTitle: PropTypes.string.isRequired,
      metaDescription: PropTypes.string.isRequired,
      heroTitle: PropTypes.string.isRequired,
      heroDescription: PropTypes.string.isRequired,
      heroImage: gatsbyImagePropType.isRequired,
      heroCtaCards: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
          iconType: PropTypes.oneOf([`volunteer`, `donate`, `ua-flag`]),
        })
      ),
      modules: ContentfulModulePropTypes,
    }),
  }),
};

HomePage.defaultProps = {
  pageContext: {
    heroCtaCards: [],
    modules: [],
  },
};

export default HomePage;

export const modularPageQuery = graphql`
  query (
    $id: String
    $navigationId: String
    $locale: String
    $promoLineId: String
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

    # Home Page
    contentfulHomepage(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
      metaTitle
      metaDescription
      heroTitle
      heroDescription
      heroImage {
        gatsbyImageData(
          formats: WEBP
          height: 567
          width: 1440
          placeholder: BLURRED
          layout: FULL_WIDTH
        )
      }
      heroCtaCards {
        ... on ContentfulLinkIcon {
          id
          label
          url
          iconType
        }
      }
      modules {
        ... on Node {
          id
          internal {
            type
          }
          ...PartnersModuleFragment
          ...FaqCategoriesFragment
          ...LinkCollectionModuleFragment
          ...PromotionBannerFragment
        }
      }
    }
  }
`;
