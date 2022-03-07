import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Linkify from "react-linkify";
import { Title, Meta } from "react-head";

// Styles.
import "./aukojimas.css";

// Components.
import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";
import Button from "../../components/Button";
import CardSection from "../../components/Card/CardSection";
import Tabs from "../../components/Tabs";

const Page = ({ data }) => {
  const crumbs = [`Aukojimas`];
  const additionalNavigation = [`Savanorystė`];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const organisations = data.organisations.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const [tabState, setTabState] = React.useState(1);

  function handleTab(tabState) {
    setTabState(tabState);
  }

  return (
    <Layout pagePath="/kaip-galiu-padeti/aukojimas/">
      <Title>Aukojimas</Title>

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
          {organisations.map((organisation, i) => {
            const logo = organisation.logo && (
              <GatsbyImage
                image={getImage(organisation.logo)}
                alt={organisation.title}
              />
            );
            const location = tabState === 1 ? `Lietuvoje` : `Užsienyje`;
            if (location === organisation.location) {
              return (
                <Card title={organisation.title} logo={logo} key={i}>
                  {!!organisation.about && (
                    <CardSection title="Apie" content={organisation.about} />
                  )}
                  {!!organisation.cause && (
                    <CardSection
                      title="Paskirtis"
                      content={organisation.cause}
                    />
                  )}
                  {!!organisation.rekvizitai && (
                    <CardSection
                      title="Kita informacija"
                      content={organisation.rekvizitai}
                    />
                  )}

                  {/*<h3>Forma</h3>*/}
                  {/*<div>*/}
                  {/*  <ul>*/}
                  {/*    {organisation.forma.map((forma, j) => {*/}
                  {/*      return <li key={j}>{forma}</li>;*/}
                  {/*    })}*/}
                  {/*  </ul>*/}
                  {/*</div>*/}

                  <div className={`Card__actions`}>
                    {!!organisation.support_link && (
                      <Button
                        icon={`arrow-white`}
                        href={organisation.support_link}
                        color={`primary`}
                        text={`Paremti`}
                        position={`right`}
                        target="_blank"
                      />
                    )}

                    {!!organisation.website && (
                      <Button
                        icon={`arrow-blue`}
                        href={organisation.website}
                        color={`transparent`}
                        text={`Oficialus puslapis`}
                        position={`right`}
                        target="_blank"
                      />
                    )}

                    {/* Use this for tabs */}
                    {/* {organisation.location} */}
                  </div>
                </Card>
              );
            }
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
          regex: "//src/content/pages/kaip-galiu-padeti/aukojimas.md$/"
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
    organisations: allFile(
      filter: { sourceInstanceName: { eq: "orgs-for-donating" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              about
              cause
              rekvizitai
              title
              website
              support_link
              location
              logo {
                childImageSharp {
                  gatsbyImageData(height: 30)
                }
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
    organisations: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                about: PropTypes.string,
                cause: PropTypes.string,
                rekvizitai: PropTypes.string,
                title: PropTypes.string,
                website: PropTypes.string,
                support_link: PropTypes.string,
                logo: PropTypes.object,
                location: PropTypes.string,
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
