import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import {
  gatsbyImagePropType,
  localePropType,
  navigationPropTypes,
  promoLinePropTypes,
} from "../helpers/genericPropTypes";
import { getLocaleFromPath } from "../helpers/handlers";

import Layout from "../components/Layout";
import Section from "../components/Section";
import HeroBanner from "../components/HeroBanner";
import Button from "../components/Button";
import LinkCollectionWithImage from "../components/LinkCollectionWithImage";
import {
  ContentfulModule,
  ContentfulModulePropTypes,
} from "../components/ContentfulModule";
import Constraint from "../components/Constraint";
import CtaCard from "../components/CtaCard";
import PromoLine from "../components/PromoLine";

const HomePage = ({ path, pageContext }) => {
  const {
    node_locale,
    navigation,
    metaTitle,
    metaDescription,
    heroImage,
    heroTitle,
    heroDescription,
    heroCtaCards,
    mainSectionHeading,
    mainSectionImage,
    mainSectionLinks,
    promoLine,
    modules,
  } = pageContext;

  const locale = getLocaleFromPath();
  const isLt = locale === `lt-LT`;

  return (
    <Layout
      pagePath={path}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      navigation={navigation}
      locale={node_locale}
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

      {/* @todo: move promoline to modules */}
      {promoLine && isLt && (
        <Section>
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

      {mainSectionLinks && mainSectionHeading && (
        <Section className="BeVigilantSection">
          <Constraint>
            <LinkCollectionWithImage
              image={mainSectionImage}
              title={mainSectionHeading}
            >
              {mainSectionLinks.map(({ id, url, label }) => {
                if (!label || !url) {
                  return null;
                }
                return (
                  <li key={id}>
                    <Button
                      endIcon={`arrow-blue`}
                      to={url}
                      color={`transparent`}
                    >
                      {label}
                    </Button>
                  </li>
                );
              })}
            </LinkCollectionWithImage>
          </Constraint>
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
    navigation: navigationPropTypes.isRequired,
    promoLine: promoLinePropTypes,
    id: PropTypes.string.isRequired,
    node_locale: localePropType.isRequired,
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
    mainSectionHeading: PropTypes.string.isRequired,
    mainSectionImage: gatsbyImagePropType.isRequired,
    mainSectionLinks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    modules: ContentfulModulePropTypes,
  }),
};

HomePage.defaultProps = {
  pageContext: {
    informationPartners: [],
    contentPartners: [],
    technologyPartners: [],
    institutionPartners: [],
  },
};

export default HomePage;
