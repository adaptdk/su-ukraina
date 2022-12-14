import { graphql } from "gatsby";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";

import Faq from "../components/Faq";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import Section from "../components/Section";

import { modifyCrumbs } from "../utils/modifyCrumbs";

export default function Template({ data, pageContext }) {
  const {
    breadcrumb: { crumbs },
  } = pageContext;
  const post = data.post.edges[0].node.childMarkdownRemark;
  const { html, frontmatter } = post;

  const faq = data.faq.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  });

  const modifiedCrumbs = useMemo(() => {
    return modifyCrumbs(crumbs, frontmatter.title_override);
  }, [frontmatter.title_override]);

  return (
    <Layout pagePath={pageContext.path}>
      {frontmatter && frontmatter.title_override ? (
        <PageTitle title={frontmatter.title_override} />
      ) : (
        <PageTitle title={pageContext.title} />
      )}
      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../images/hero/refugee_guide.jpg"
          alt="Refugee Guide"
          layout="fullWidth"
        />
      </Section>
      {!!frontmatter && (
        <Faq
          currentItemData={frontmatter}
          navData={faq}
          faqHtml={html}
          crumbs={modifiedCrumbs}
          lang="ua"
        />
      )}
    </Layout>
  );
}

Template.propTypes = {
  pageContext: PropTypes.shape({
    breadcrumb: PropTypes.shape({
      crumbs: PropTypes.array,
    }),
    path: PropTypes.string,
    title: PropTypes.string,
  }),
  data: PropTypes.shape({
    faq: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.object,
              html: PropTypes.string,
            }),
          }),
        })
      ),
    }),
    post: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title_override: PropTypes.string,
              }),
              html: PropTypes.string,
            }),
          }),
        })
      ),
    }),
  }),
};

export const query = graphql`
  query ($slug: String!, $sourceInstanceName: String!) {
    faq: allFile(
      filter: { sourceInstanceName: { eq: $sourceInstanceName } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              weight
              title
              title_override
              slug
              icon
            }
          }
        }
      }
    }
    post: allFile(
      filter: {
        sourceInstanceName: { eq: $sourceInstanceName }
        childMarkdownRemark: { frontmatter: { slug: { eq: $slug } } }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            html
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
          }
        }
      }
    }
  }
`;
