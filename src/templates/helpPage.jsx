import React from "react";
import PropTypes from "prop-types";

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

const HelpPage = ({ path, pageContext }) => {
  const {
    currentNodeSlugs,
    navigation,
    metaTitle,
    metaDescription,
    heroImage,
    node_locale,
    pageHeading,
    pageDescription,
    organisations: orgs,
    slidingNav,
    organisationLogos,
    promoLine,
    breadcrumb: { crumbs },
  } = pageContext;

  const orgsWithLtLogo = orgs.map((org, index) => {
    return { ...org, organisationLogo: organisationLogos[index] };
  });

  const ltOrgs = orgsWithLtLogo.filter(
    ({ location }) => location === `Lithuania`
  );
  const foreignOrgs = orgsWithLtLogo.filter(
    ({ location }) => location === `Foreign`
  );

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
      navigation={navigation}
      locale={node_locale}
      currentNodeSlugs={currentNodeSlugs}
      promoLine={promoLine}
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
                  <CardListSection
                    organisations={item.data}
                    organisationLogos={organisationLogos}
                    locale={node_locale}
                  />
                </SlidingNavBlock>
              );
            })}
          </>
        )}
        {!slidingNav && (
          <CardListSection organisations={orgs} locale={node_locale} />
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
    currentNodeSlugs: nodeSlugsPropTypes.isRequired,
    navigation: navigationPropTypes.isRequired,
    promoLine: promoLinePropTypes,
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    slidingNav: PropTypes.bool.isRequired,
    metaTitle: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    heroImage: gatsbyImagePropType,
    node_locale: localePropType.isRequired,
    pageHeading: PropTypes.string,
    pageDescription: PropTypes.shape({
      raw: PropTypes.string,
    }),
    organisations: PropTypes.arrayOf(PropTypes.shape(OrganisationPropTypes)),
    organisationLogos: PropTypes.arrayOf(PropTypes.shape(gatsbyImagePropType)),
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
