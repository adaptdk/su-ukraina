import { graphql } from "gatsby";
import * as React from "react";
import PropTypes from "prop-types";
import { Title } from "react-head";
import { StaticImage } from "gatsby-plugin-image";

import ContentLayout from "../../components/ContentLayout";
import Faq from "../../components/Faq";

import Section from "../../components/Section";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  const crumbs = [`Важлива інформація`, frontmatter.title_override];

  const faq = data.faq.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  });

  return (
    <ContentLayout pagePath="/apie-mus/">
      {(!frontmatter || !frontmatter.title_override) && (
        <Title>{frontmatter.title_override}</Title>
      )}
      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../images/hero/refugee_guide.jpg"
          alt="Refugee Guide"
          layout="fullWidth"
        />
      </Section>
      {!!frontmatter && (
        <Faq
          currentItemData={frontmatter}
          navData={faq}
          faqHtml={html}
          crumbs={crumbs}
        />
      )}
    </ContentLayout>
  );
}

Template.propTypes = {
  data: PropTypes.shape({
    faq: PropTypes.shape({
      edges: PropTypes.arrayOf(),
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
            }
          }
        }
      }
    }
  }
`;
