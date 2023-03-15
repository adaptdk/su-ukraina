import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import Constraint from "../components/Constraint";
import OrganisationActions from "../components/Organisation/OrganisationActions";
import { OrganisationPropTypes } from "../components/Organisation";
import NavigationGroup from "../components/NavigationGroup";

import { formatRichText } from "../helpers/formatting";
import { getTranslatedText } from "../utils/getTranslatedText";

import "../components/Organisation/OrganisationPage.css";
import {
  localePropType,
  navigationPropTypes,
  nodeSlugsPropTypes,
  nodeSlugsDefaultProps,
  promoLinePropTypes,
} from "../helpers/genericPropTypes";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

const OrganisationPage = ({ data, path, pageContext }) => {
  const {
    locale,
    currentNodeSlugs,
    breadcrumb: { crumbs },
  } = pageContext;
  const {
    contentfulNavigation,
    contentfulPromoLineModule,
    contentfulOrganisation: {
      name,
      description,
      purpose,
      otherInformation,
      websiteUrl,
      actionUrl,
      organisationType,
      bigLogo,
    },
  } = data;

  return (
    <Layout
      pagePath={path}
      metaTitle={name || ``}
      metaDescription={``}
      navigation={contentfulNavigation}
      currentNodeSlugs={currentNodeSlugs}
      locale={locale}
      promoLine={contentfulPromoLineModule}
    >
      <Constraint className="OrganisationPage">
        <NavigationGroup crumbs={crumbs} />
        {bigLogo && (
          <div className="OrganisationPage__logo">
            <GatsbyImage image={getImage(bigLogo)} alt="" src="" />
          </div>
        )}
        {name && <h1>{name}</h1>}
        {description?.raw && (
          <div>
            <h2>{getTranslatedText(`organisation.aboutOrg`)}</h2>
            {formatRichText(description.raw)}
          </div>
        )}
        {purpose?.raw && (
          <div>
            <h2>{getTranslatedText(`organisation.purpose`)}</h2>
            {formatRichText(purpose.raw)}
          </div>
        )}
        {otherInformation?.raw && (
          <div>
            <h2>{getTranslatedText(`organisation.otherInfo`)}</h2>
            {formatRichText(otherInformation.raw)}
          </div>
        )}
        <OrganisationActions
          actionUrl={actionUrl}
          websiteUrl={websiteUrl}
          type={organisationType}
        />
      </Constraint>
    </Layout>
  );
};

OrganisationPage.propTypes = {
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    locale: localePropType.isRequired,
    currentNodeSlugs: nodeSlugsPropTypes,
    breadcrumb: PropTypes.shape({
      crumbs: PropTypes.arrayOf(
        PropTypes.shape({
          pathname: PropTypes.string.isRequired,
          crumbLabel: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }),
  data: PropTypes.shape({
    contentfulNavigation: navigationPropTypes.isRequired,
    contentfulPromoLineModule: promoLinePropTypes,
    contentfulOrganisation: PropTypes.shape(OrganisationPropTypes),
  }),
};

OrganisationPage.defaultProps = {
  pageContext: {
    nodeSlugsPropTypes: nodeSlugsDefaultProps,
  },
  data: {
    contentfulOrganisation: {
      name: ``,
      description: {
        raw: ``,
      },
      purpose: {
        raw: ``,
      },
      otherInformation: {
        raw: ``,
      },
      websiteUrl: ``,
      actionUrl: ``,
    },
  },
};

export default OrganisationPage;

export const organisationPageQuery = graphql`
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

    # Modular Page
    contentfulOrganisation(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
      ...OrganisationFragment
      bigLogo: organisationLogo {
        gatsbyImageData(height: 100, placeholder: BLURRED, formats: WEBP)
      }
    }
  }
`;
