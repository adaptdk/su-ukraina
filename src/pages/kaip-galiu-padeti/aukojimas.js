import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Aukojimas from "../../shared-pages/Aukojimas";

const Page = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext;
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
    <Aukojimas
      crumbs={crumbs}
      content={content}
      organisations={organisations}
      pagePath="/kaip-galiu-padeti/aukojimas/"
    />
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
                  gatsbyImageData(height: 30, placeholder: NONE)
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
  pageContext: PropTypes.shape({
    breadcrumb: PropTypes.shape({
      crumbs: PropTypes.array,
    }),
  }),
  data: PropTypes.shape({
    contents: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.object,
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
              frontmatter: PropTypes.object,
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
