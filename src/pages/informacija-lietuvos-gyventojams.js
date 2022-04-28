import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Title } from "react-head";

import Faq from "../components/Faq";
import Layout from "../components/Layout";

const Page = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext;

  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  })[0];

  return (
    <Layout pagePath="/informacija-lietuvos-gyventojams/">
      {(!content || !content.title) && <Title>Apie Mus</Title>}

      <Faq currentItemData={content} faqHtml={content.html} crumbs={crumbs} />
    </Layout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: {
          regex: "//src/content/pages/informacija-lietuvos-gyventojams.md$/"
        }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              title_override
              questions {
                title
                answer
                content_blocks {
                  template
                  title
                  content
                  image {
                    childImageSharp {
                      gatsbyImageData(width: 800, placeholder: NONE)
                    }
                  }
                }
                resources {
                  title
                  subtitle
                  url
                }
              }
            }
            html
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
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
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
