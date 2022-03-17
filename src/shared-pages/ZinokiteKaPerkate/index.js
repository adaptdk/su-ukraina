import * as React from "react";
import PropTypes from "prop-types";
import { Title, Meta } from "react-head";
import { StaticImage } from "gatsby-plugin-image";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";
import Section from "../../components/Section";
import PositiveNegativeList from "../../components/PositiveNegativeList";
import PositiveNegativeListItem from "../../components/PositiveNegativeList/PositiveNegativeListItem";
import TabsButton from "../../components/TabsButton";

const Page = ({ companies, content, pagePath }) => {
  const crumbs = [`Žinokite ką perkate`];
  const additionalNavigation = [
    `Patikima informacija`,
    `sukčiai ir dezinformacija`,
    `piliečio atmintinė`,
  ];

  return (
    <Layout pagePath={pagePath}>
      <Title>Žinokite ką perkate</Title>

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../images/hero/piliecio_atmintine.jpg"
          alt="Budinkite veikti"
          layout="fullWidth"
        />
      </Section>

      {!!content && (
        <Constraint>
          <NavigationGroup
            crumbs={crumbs}
            additionalNav={additionalNavigation}
          />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint>
        <section className="TabsContainer">
          <TabsButton
            pagePath={pagePath}
            text={`Rusiškos`}
            to={`/bukime-budrus/zinokite-ka-perkate/rusiskos/`}
          />
          <TabsButton
            pagePath={pagePath}
            text={`Baltarusiškos`}
            to={`/bukime-budrus/zinokite-ka-perkate/baltarusiskos/`}
          />
          <TabsButton
            pagePath={pagePath}
            text={`Ukrainietiškos`}
            to={`/bukime-budrus/zinokite-ka-perkate/ukrainietiskos/`}
          />
        </section>
        <CardList>
          {companies.map((company, i) => {
            const positives = [];
            const negatives = [];

            company.information.forEach((information) => {
              if (information.type === `positive`) {
                return positives.push(information);
              }
              if (information.type === `negative`) {
                return negatives.push(information);
              }
            });

            return (
              <Card
                title={company.title}
                subtitle={company.description}
                externalImage={company.image_url}
                key={i}
              >
                <PositiveNegativeList>
                  <React.Fragment>
                    {negatives.map((information, i) => {
                      return (
                        <PositiveNegativeListItem
                          key={i}
                          type={information.type}
                          description={information.description}
                          source={information.source}
                        />
                      );
                    })}
                    {!!positives.length && (
                      <p className="separator">
                        <span>Bet</span>
                      </p>
                    )}
                    {positives.map((information, i) => {
                      return (
                        <PositiveNegativeListItem
                          key={i}
                          type={information.type}
                          description={information.description}
                          source={information.source}
                        />
                      );
                    })}
                  </React.Fragment>
                </PositiveNegativeList>
              </Card>
            );
            // }
          })}
        </CardList>
      </Constraint>
    </Layout>
  );
};

Page.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    html: PropTypes.string,
    excerpt: PropTypes.string,
  }),
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      country: PropTypes.string,
      image_url: PropTypes.string,
      information: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
          type: PropTypes.string,
          source: PropTypes.string,
        })
      ),
    })
  ),
  pagePath: PropTypes.string,
};

export default Page;
