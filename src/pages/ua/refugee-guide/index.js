import * as React from "react";
import { Title, Meta } from "react-head";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { useLocation } from "@gatsbyjs/reach-router";

import Constraint from "../../../components/Constraint";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../../../components/Layout";
import FaqNav from "../../../components/Faq/FaqNav";
import Section from "../../../components/Section";
import Breadcrumbs from "../../../components/Breadcrumbs";

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

  const faqNav = data.faq.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  });

  const pathname = useLocation().pathname;

  return (
    <Layout>
      {(!content || !content.title) && <Title>Gidas Ukrainiečiams</Title>}
      <Meta
        name="description"
        content="Sąrašas iniciatyvų vykdomų Lietuvoje, kurios skirtos pagelbėti Ukrainos žmonėms"
      />

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../../images/hero/refugee_guide.jpg"
          alt="Refugee Guide"
          layout="fullWidth"
        />
      </Section>

      {!!content && (
        <Constraint>
          <Breadcrumbs crumbs={crumbs} />
          <h1>{content.title_override}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <FaqNav navData={faqNav} pathname={pathname} lang="ua" />
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
        absolutePath: { regex: "//src/content/pages/refugee-guide.md$/" }
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
      filter: { sourceInstanceName: { eq: "refugee-guide" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
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
                slug: PropTypes.slug,
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
