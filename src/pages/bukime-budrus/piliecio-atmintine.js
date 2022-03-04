import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Linkify from "react-linkify";

import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumbs";

const Page = ({ data }) => {
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  })[0];

  const handbooks = data.handbooks.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  return (
    <Layout>
      <title>Piliečio atmintinė</title>

      {!!content && (
        <Constraint>
          <Breadcrumb crumbs={[`Titulinis`, `Piliečio atmintinė`]} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </Constraint>
      )}

      <Constraint>
        {handbooks.map((handbook, i) => {
          return (
            <section key={i}>
              <h2>{handbook.title}</h2>
              <div>{handbook.intro}</div>
              {handbook.contents.map((contents, j) => {
                return (
                  <details key={j}>
                    <summary>{contents.title}</summary>
                    <Linkify>{contents.answer}</Linkify>
                  </details>
                );
              })}
            </section>
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
          regex: "//src/content/pages/bukime-budrus/piliecio-atmintine.md$/"
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
    handbooks: allFile(
      filter: { sourceInstanceName: { eq: "citizen-handbooks" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              contents {
                title
                answer
              }
              intro
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
    handbooks: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                intro: PropTypes.string,
                contents: PropTypes.arrayOf(
                  PropTypes.shape({
                    title: PropTypes.string,
                    answer: PropTypes.string,
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
