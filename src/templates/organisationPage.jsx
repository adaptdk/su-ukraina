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

const OrganisationPage = ({ path, pageContext }) => {
  const {
    name,
    description,
    purpose,
    otherInformation,
    websiteUrl,
    actionUrl,
    organisationType,
    breadcrumb: { crumbs },
  } = pageContext;

  const seo = { pageTitle: name || `Organisation`, description: `` };

  return (
    <Layout pagePath={path} seo={seo}>
      <Constraint className="OrganisationPage">
        <NavigationGroup crumbs={crumbs} />
        {name && <h1>{name}</h1>}
        {description?.raw && (
          <div>
            <h2>{getTranslatedText(`organisation.about`)}</h2>
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
