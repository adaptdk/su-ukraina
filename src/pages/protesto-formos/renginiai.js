import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";

const Page = ({ data }) => {
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  })[0];

  const events = data.events.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  });

  return (
    <Layout>
      {!content?.title && (
        <title>Renginiai</title>
      )}

      {!!content && (
        <Constraint>
          <title>{content.title}</title>
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </Constraint>
      )}

      <Constraint>
        {events.map((event, i) => {
          return (
            <article key={i}>
              <h2>{event.title}</h2>
              <p>Vieta: {event.location}</p>
              <p>Data: {new Date(event.date).toLocaleString(`lt`)}</p>
              <div dangerouslySetInnerHTML={{ __html: event.html }} />
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
          regex: "//src/content/pages/protesto-formos/renginiai.md$/"
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
    events: allFile(
      filter: { sourceInstanceName: { eq: "events" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              date
              location
            }
            html
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
    events: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string,
                location: PropTypes.string,
              }),
            }),
            html: PropTypes.string,
          }),
        })
      ),
    }),
  }),
};

export default Page;
