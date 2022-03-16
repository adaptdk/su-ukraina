import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
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
import Tabs from "../../components/Tabs";

const Page = ({ data }) => {
  const crumbs = [`Žinokite ką perkate`];
  const additionalNavigation = [
    `Patikima informacija`,
    `sukčiai ir dezinformacija`,
    "piliečio atmintinė",
  ];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const companies = data.companies.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const [tabState, setTabState] = React.useState(1);

  function handleTab(tabState) {
    setTabState(tabState);
  }

  return (
    <Layout pagePath="/bukime-budrus/zinokite-ka-perkate/">
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
        <Tabs
          handleTab={handleTab}
          tabState={tabState}
          firstOption={`Lietuvoje`}
          secondOption={`Užsienyje`}
        />
        <CardList>
          {companies.map((company, i) => {
            //const location = tabState === 1 ? `Lietuvoje` : `Užsienyje`;
            // if (location === company.location) {

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

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: {
          regex: "//src/content/pages/bukime-budrus/zinokite-ka-perkate.md$/"
        }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
            }
            html
            excerpt(format: PLAIN, pruneLength: 160)
          }
        }
      }
    }
    companies: allFile(
      filter: { sourceInstanceName: { eq: "companies" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              description
              country
              image_url
              information {
                description
                type
                source
              }
            }
          }
        }
      }
    }
  }
`;

Page.propTypes = {
  data: PropTypes.shape({
    contents: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
              }),
            }),
            html: PropTypes.string,
            excerpt: PropTypes.string,
          }),
        })
      ),
    }),
    companies: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
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
              }),
            }),
          }),
        })
      ),
    }),
    organisations: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
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
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
