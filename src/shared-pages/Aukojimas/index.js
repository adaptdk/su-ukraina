import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { Title, Meta } from "react-head";

import "./index.css";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";
import Button from "../../components/Button";
import CardSection from "../../components/Card/CardSection";
import Section from "../../components/Section";
import SlidingNavigation from "../../components/SlidingNavigation";
import TitledSection from "../../components/TitledSection/TitledSection";

const CardListSection = ({ organisations }) => {
  return (
    <CardList>
      {organisations.map((organisation, i) => {
        const logo = organisation.logo && (
          <GatsbyImage
            image={getImage(organisation.logo)}
            alt={organisation.title}
          />
        );
        return (
          <Card title={organisation.title} logo={logo} key={i}>
            {!!organisation.about && (
              <CardSection title="Apie" content={organisation.about} />
            )}
            {!!organisation.cause && (
              <CardSection title="Paskirtis" content={organisation.cause} />
            )}
            {!!organisation.rekvizitai && (
              <CardSection
                title="Kita informacija"
                content={organisation.rekvizitai}
              />
            )}

            <div className={`Card__actions`}>
              {!!organisation.support_link && (
                <Button
                  endIcon={`arrow-white`}
                  href={organisation.support_link}
                  color={`primary`}
                  target="_blank"
                >
                  Paremti
                </Button>
              )}

              {!!organisation.website && (
                <Button
                  endIcon={`arrow-blue`}
                  href={organisation.website}
                  color={`transparent`}
                  target="_blank"
                >
                  Oficialus puslapis
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </CardList>
  );
};

const Page = ({ content, organisations, pagePath, crumbs }) => {
  const lithuanianOrganisations = organisations.filter((organisation) => {
    return organisation.location === `Lietuvoje`;
  });
  const foreignOrganisations = organisations.filter((organisation) => {
    return organisation.location !== `Lietuvoje`;
  });

  const slidingNavData = [
    {
      title: `Lietuvoje`,
      linkId: `lietuvoje`,
    },
    {
      title: `Užsienyje`,
      linkId: `uzsienyje`,
    },
  ];

  return (
    <Layout pagePath={pagePath}>
      <Title>Aukojimas</Title>

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../images/hero/aukojimas.jpg"
          alt="Su Ukraina!"
          layout="fullWidth"
        />
      </Section>

      {!!content && (
        <Constraint>
          <NavigationGroup crumbs={crumbs} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint>
        <SlidingNavigation data={slidingNavData} options={{ threshold: 0.1 }} />
        <TitledSection id="lietuvoje" title="Lietuvoje">
          <CardListSection organisations={lithuanianOrganisations} />
        </TitledSection>
        <TitledSection id="uzsienyje" title="Užsienyje">
          <CardListSection organisations={foreignOrganisations} />
        </TitledSection>
      </Constraint>
    </Layout>
  );
};

Page.propTypes = {
  crumbs: PropTypes.array,
  content: PropTypes.shape({
    title: PropTypes.string,
    html: PropTypes.string,
    excerpt: PropTypes.string,
  }),
  organisations: PropTypes.arrayOf(
    PropTypes.shape({
      about: PropTypes.string,
      cause: PropTypes.string,
      rekvizitai: PropTypes.string,
      title: PropTypes.string,
      website: PropTypes.string,
      support_link: PropTypes.string,
      logo: PropTypes.object,
      location: PropTypes.string,
    })
  ),
  pagePath: PropTypes.string,
};

CardListSection.propTypes = {
  organisations: PropTypes.arrayOf(
    PropTypes.shape({
      about: PropTypes.string,
      cause: PropTypes.string,
      rekvizitai: PropTypes.string,
      title: PropTypes.string,
      website: PropTypes.string,
      support_link: PropTypes.string,
      logo: PropTypes.object,
      location: PropTypes.string,
    })
  ),
};

export default Page;
