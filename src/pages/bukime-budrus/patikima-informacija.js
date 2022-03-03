import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Linkify from "react-linkify";

import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";

const Page = ({ data }) => {
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  })[0];

  const infoOrgs = data.infoOrgs.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const infoPeople = data.infoPeople.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  return (
    <Layout>
      <title>Patikima informacija</title>

      {!!content && (
        <Constraint>
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </Constraint>
      )}

      <Constraint>
        <h2>Asmenybės</h2>
        {infoPeople.map((person, i) => {
          return (
            <article key={i}>
              <p>{person.title}</p>
              <p>{person.description}</p>
              <p>{person.url}</p>
              <p>{person.twitter}</p>
              <p>{person.facebook}</p>
            </article>
          );
        })}
      </Constraint>

      <Constraint>
        <h2>Institucijos</h2>
        {infoOrgs.map((org, i) => {
          return (
            <article key={i}>
              <p>{org.title}</p>
              <p>{org.description}</p>
              <p>{org.url}</p>
              <p>{org.twitter}</p>
              <p>{org.facebook}</p>
            </article>
          );
        })}
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
          regex: "//src/content/pages/bukime-budrus/patikima-informacija.md$/"
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
          }
        }
      }
    }
    infoPeople: allFile(
      filter: { sourceInstanceName: { eq: "info-people" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              description
              url
              facebook
              twitter
              weight
            }
          }
        }
      }
    }
    infoOrgs: allFile(
      filter: { sourceInstanceName: { eq: "info-orgs" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              description
              url
              facebook
              twitter
              weight
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
          }),
        })
      ),
    }),
    infoPeople: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                url: PropTypes.string,
                facebook: PropTypes.string,
                twitter: PropTypes.string,
              }),
            }),
          }),
        })
      ),
    }),
    infoOrgs: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                url: PropTypes.string,
                facebook: PropTypes.string,
                twitter: PropTypes.string,
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
