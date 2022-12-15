import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import { HeroSection, HeroSectionPropTypes } from "../components/HeroSection";
import Constraint from "../components/Constraint";
import NavigationGroup from "../components/NavigationGroup";
import SlidingNavigation from "../components/SlidingNavigation";
import { SlidingNavBlock } from "../components/ContentfulModule/SlidingNavBlock";
import {
  CardListSection,
  OrganisationPropTypes,
} from "../components/Organisation";

import { localePropType, seoPropTypes } from "../helpers/genericPropTypes";
import { formatRichText } from "../helpers/formatting";

const HelpPage = ({ path, pageContext }) => {
  const {
    seo,
    hero,
    node_locale,
    pageHeading,
    pageDescription,
    organisations,
    slidingNav,
    breadcrumb: { crumbs },
  } = pageContext;

  const lithuanianOrganisations = organisations.filter((organisation) => {
    return organisation.location === `Lithuania`;
  });
  const foreignOrganisations = organisations.filter((organisation) => {
    return organisation.location === `Foreign`;
  });

  const slidingNavData = [
    {
      title: `Lietuvoje`,
      linkId: `lietuvoje`,
      icon: `house`,
      data: lithuanianOrganisations,
    },
    {
      title: `Užsienyje`,
      linkId: `uzsienyje`,
      icon: `foreign`,
      data: foreignOrganisations,
    },
  ];

  return (
    <Layout pagePath={path} seo={seo}>
      {hero && <HeroSection {...hero} />}

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
                    locale={node_locale}
                  />
                </SlidingNavBlock>
              );
            })}
          </>
        )}
        {!slidingNav && <CardListSection organisations={organisations} />}
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
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    slidingNav: PropTypes.bool.isRequired,
    seo: PropTypes.shape(seoPropTypes).isRequired,
    hero: PropTypes.shape(HeroSectionPropTypes),
    node_locale: localePropType.isRequired,
    pageHeading: PropTypes.string,
    pageDescription: PropTypes.shape({
      raw: PropTypes.string,
    }),
    organisations: PropTypes.arrayOf(PropTypes.shape(OrganisationPropTypes)),
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
