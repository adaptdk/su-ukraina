import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { HeroSection } from "../components/HeroSection";
import Constraint from "../components/Constraint";
import NavigationGroup from "../components/NavigationGroup";
import SlidingNavigation from "../components/SlidingNavigation";
import { SlidingNavBlock } from "../components/ContentfulModule/SlidingNavBlock";
import {
  CardListSection,
  OrganisationPropTypes,
} from "../components/Organisation";

import {
  gatsbyImagePropType,
  localePropType,
  navigationPropTypes,
  nodeSlugsPropTypes,
  promoLinePropTypes,
} from "../helpers/genericPropTypes";
import { formatRichText } from "../helpers/formatting";
import { getTranslatedText } from "../utils/getTranslatedText";

const HelpPage = ({ data, path, pageContext }) => {
  const {
    breadcrumb: { crumbs },
    locale,
    currentNodeSlugs,
  } = pageContext;
  const {
    contentfulNavigation,
    contentfulPromoLineModule,
    contentfulHelpPage: {
      metaTitle,
      metaDescription,
      heroImage,
      pageHeading,
      pageDescription,
      organisations: orgs,
      slidingNav,
    },
  } = data;

  const ltOrgs = orgs.filter(({ location }) => location === `Lithuania`);
  const foreignOrgs = orgs.filter(({ location }) => location === `Foreign`);

  const slidingNavData = [
    {
      title: getTranslatedText(`helpPage.lithuanian`),
      linkId: `lithuanian`,
      icon: `house`,
      data: ltOrgs,
    },
    {
      title: getTranslatedText(`helpPage.foreign`),
      linkId: `foreign`,
      icon: `foreign`,
      data: foreignOrgs,
    },
  ].filter((item) => item?.data?.length);

  return (
    <Layout
      pagePath={path}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      navigation={contentfulNavigation}
      locale={locale}
      currentNodeSlugs={currentNodeSlugs}
      promoLine={contentfulPromoLineModule}
    >
      {heroImage && <HeroSection heroImage={heroImage} />}

      <Constraint>
        <NavigationGroup crumbs={crumbs} />
        {pageHeading && <h1>{pageHeading}</h1>}
        {pageDescription?.raw && formatRichText(pageDescription.raw)}
      </Constraint>

      <Constraint className="Constraint--sliding-nav">
        {!!slidingNav && (
          <>
            <SlidingNavigation data={slidingNavData} />
            {slidingNavData.map((item) => {
              return (
                <SlidingNavBlock
                  key={item.linkId}
                  id={item.linkId}
                  title={item.title}
                  icon={item.icon}
                >
                  <CardListSection organisations={item.data} locale={locale} />
                </SlidingNavBlock>
              );
            })}
          </>
        )}
        {!slidingNav && (
          <CardListSection organisations={orgs} locale={locale} />
        )}
      </Constraint>
    </Layout>
  );
};

HelpPage.propTypes = {
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
    currentNodeSlugs: nodeSlugsPropTypes.isRequired,
    organisationLogos: PropTypes.arrayOf(PropTypes.shape(gatsbyImagePropType)),
  }),
  data: PropTypes.shape({
    contentfulNavigation: navigationPropTypes.isRequired,
    contentfulPromoLineModule: promoLinePropTypes,
    contentfulHelpPage: PropTypes.shape({
      slidingNav: PropTypes.bool.isRequired,
      metaTitle: PropTypes.string.isRequired,
      metaDescription: PropTypes.string.isRequired,
      heroImage: gatsbyImagePropType,
      pageHeading: PropTypes.string,
      pageDescription: PropTypes.shape({
        raw: PropTypes.string,
      }),
      organisations: PropTypes.arrayOf(PropTypes.shape(OrganisationPropTypes)),
    }),
  }),
};

HelpPage.defaultProps = {
  pageTitle: ``,
  pageDescription: {
    raw: ``,
  },
  organisations: [],
};

export default HelpPage;

export const helpPageQuery = graphql`
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
      heading
      subheading
      headingLink
      linkButtons {
        ...LinkFragment
      }
    }

    # Help Page
    contentfulHelpPage(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
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
      pageHeading
      pageDescription {
        raw
      }
      slidingNav
      organisations {
        ...OrganisationFragment
      }
    }
  }
`;
