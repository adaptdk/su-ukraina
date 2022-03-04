import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Linkify from "react-linkify";
import { Title, Meta } from "react-head";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";

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
                <h3>Paskirtis</h3>
                <div>
                  <Linkify>{organisation.cause}</Linkify>
                </div>

                <h3>Apie</h3>
                <div>
                  <Linkify>{organisation.about}</Linkify>
                </div>

                <h3>Forma</h3>
                <div>
                  <ul>
                    {organisation.forma.map((forma, j) => {
                      return <li key={j}>{forma}</li>;
                    })}
                  </ul>
                </div>

                <h3>Rekvizitai/registracija</h3>
                <div>
                  <Linkify>{organisation.rekvizitai}</Linkify>
                </div>

                <h3>Oficialus puslapis</h3>
                <div>
                  <Linkify>{organisation.website}</Linkify>
                </div>
              </Card>
            );
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
              forma
              rekvizitai
              title
              website
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
                forma: PropTypes.array,
                rekvizitai: PropTypes.string,
                title: PropTypes.string,
                website: PropTypes.string,
                logo: PropTypes.object,
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
