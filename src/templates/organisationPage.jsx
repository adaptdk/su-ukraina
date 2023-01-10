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
} from "../helpers/genericPropTypes";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const OrganisationPage = ({ path, pageContext }) => {
  const {
    node_locale,
    navigation,
    name,
    description,
    purpose,
    otherInformation,
    websiteUrl,
    actionUrl,
    organisationType,
    organisationLogo,
    currentNodeSlugs,
    breadcrumb: { crumbs },
  } = pageContext;

  return (
    <Layout
      pagePath={path}
      metaTitle={name || ``}
      metaDescription={``}
      navigation={navigation}
      currentNodeSlugs={currentNodeSlugs}
      locale={node_locale}
    >
      <Constraint className="OrganisationPage">
        <NavigationGroup crumbs={crumbs} />
        {organisationLogo && (
          <div className="OrganisationPage__logo">
            <GatsbyImage image={getImage(organisationLogo)} alt="" src="" />
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

const organisationPageContext = {
  ...OrganisationPropTypes,
  navigation: navigationPropTypes.isRequired,
  node_locale: localePropType.isRequired,
  breadcrumb: PropTypes.shape({
    crumbs: PropTypes.arrayOf(
      PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        crumbLabel: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

OrganisationPage.propTypes = {
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape(organisationPageContext),
};

OrganisationPage.defaultProps = {
  pageContext: {
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
};

export default OrganisationPage;
