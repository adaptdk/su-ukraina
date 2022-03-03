import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Linkify from "react-linkify";

import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";

const Page = ({ data }) => {
  const initiatives = data.allFile.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  });

  return (
    <Layout>
      <Constraint>
        <title>Savanorystė</title>

        {initiatives.map((initiative, i) => {
          return (
            <article key={i}>
              <h2>{initiative.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: initiative.html }} />
            </article>
          );
        })}
      </Constraint>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile(
      filter: { sourceInstanceName: { eq: "initiatives" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
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
  }
`;

Page.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
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
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
