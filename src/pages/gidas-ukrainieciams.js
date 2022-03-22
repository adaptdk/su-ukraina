import * as React from "react";
import { Title, Meta } from "react-head";
import { graphql } from "gatsby";

import HelpSearch from "../components/HelpSearch";
import Layout from "../components/Layout";

const Page = () => {
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const faq = data.faq.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  });

  console.log(faq);

  return (
    <Layout>
      {(!content || !content.title) && <Title>Gidas Ukrainiečiams</Title>}
      <Meta
        name="description"
        content="Sąrašas iniciatyvų vykdomų Lietuvoje, kurios skirtos pagelbėti Ukrainos žmonėms"
      />

      {!!content && (
        <Constraint>
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </Constraint>
      )}
    </Layout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: { regex: "//src/content/pages/gidas-ukrainieciams.md$/" }
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
    faq: allFile(
      filter: { sourceInstanceName: { eq: "faq-ua" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
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
    faq: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title_override: PropTypes.string,
                title: PropTypes.string,
                questions: PropTypes.arrayOf(
                  PropTypes.shape({
                    title: PropTypes.string,
                    answer: PropTypes.string,
                    resources: PropTypes.arrayOf(
                      PropTypes.shape({
                        title: PropTypes.string,
                        subtitle: PropTypes.string,
                        url: PropTypes.string,
                      })
                    ),
                  })
                ),
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
