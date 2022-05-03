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
import TabsButton from "../../components/TabsButton";

const Page = ({ content, organisations, pagePath, crumbs }) => {
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
        <section className="TabsContainer">
          <TabsButton
            pagePath={pagePath}
            text={`Lietuvoje`}
            to={`/kaip-galiu-padeti/aukojimas/lietuvoje/`}
          />
          <TabsButton
            pagePath={pagePath}
            text={`Užsienyje`}
            to={`/kaip-galiu-padeti/aukojimas/uzsienyje/`}
          />
        </section>
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

export default Page;
