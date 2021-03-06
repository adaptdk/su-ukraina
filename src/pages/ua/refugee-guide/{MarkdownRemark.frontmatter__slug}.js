import { graphql } from "gatsby";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Title } from "react-head";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../../../components/Layout";
import Faq from "../../../components/Faq";

import Section from "../../../components/Section";

import { modifyCrumbs } from "../../../utils/modifyCrumbs";

export default function Template({ data, pageContext }) {
  const {
    breadcrumb: { crumbs },
  } = pageContext;
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
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
    <Layout pagePath="/apie-mus/">
      {frontmatter && frontmatter.title_override ? (
        <Title>{frontmatter.title_override}</Title>
      ) : (
        <Title>Важлива інформація</Title>
      )}
      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../../images/hero/refugee_guide.jpg"
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
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title_override: PropTypes.string,
      }),
      html: PropTypes.string,
    }),
  }),
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
    faq: allFile(
      filter: { sourceInstanceName: { eq: "refugee-guide" } }
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
  }
`;
