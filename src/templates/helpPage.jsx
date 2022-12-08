import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import { HeroSection, HeroSectionPropTypes } from "../components/HeroSection";
import Constraint from "../components/Constraint";
import NavigationGroup from "../components/NavigationGroup";
import SlidingNavigation from "../components/SlidingNavigation";
import { SlidingNavBlock } from "../components/ContentfulModule/SlidingNavBlock";
import CardList from "../components/CardList";
import Card from "../components/Card";
import Button from "../components/Button";
import CardSection from "../components/Card/CardSection";

import { seoPropTypes } from "../helpers/genericPropTypes";
import { formatRichText } from "../helpers/formatting";

const CardListSection = ({ organisations }) => {
  return (
    <CardList>
      {organisations.map(
        ({
          id,
          name,
          organisationLogo,
          description,
          purpose,
          otherInformation,
          ctaList,
        }) => {
          const logo = organisationLogo && (
            <GatsbyImage image={getImage(organisationLogo)} alt={name} />
          );
          return (
            <Card title={name} logo={logo} key={id}>
              {!!description?.raw && (
                <CardSection title="Apie" content={description} />
              )}
              {!!purpose?.raw && (
                <CardSection title="Paskirtis" content={purpose} />
              )}
              {!!otherInformation?.raw && (
                <CardSection
                  title="Kita informacija"
                  content={otherInformation}
                />
              )}

              {!!ctaList.length && (
                <div className={`Card__actions`}>
                  {ctaList.map((cta) => {
                    return (
                      <Button
                        key={cta.id}
                        endIcon={cta.isPrimary ? `arrow-white` : `arrow-blue`}
                        href={cta.url}
                        color={cta.isPrimary ? `primary` : `transparent`}
                        target="_blank"
                      >
                        {cta.label}
                      </Button>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        }
      )}
    </CardList>
  );
};

const HelpPage = ({ path, pageContext }) => {
  const {
    seo,
    hero,
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
                  <CardListSection organisations={item.data} />
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

const organisationsProp = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.oneOf([`Lithuania`, `Foreign`]).isRequired,
    description: PropTypes.shape({
      raw: PropTypes.string.isRequired,
    }).isRequired,
    purpose: PropTypes.shape({
      raw: PropTypes.string.isRequired,
    }).isRequired,
    otherInformation: PropTypes.shape({
      raw: PropTypes.string,
    }),
    ctaList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        isPrimary: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  })
);

CardListSection.propTypes = {
  organisations: organisationsProp,
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
    pageHeading: PropTypes.string,
    pageDescription: PropTypes.shape({
      raw: PropTypes.string,
    }),
    organisations: organisationsProp,
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
