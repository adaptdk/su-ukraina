import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Meta, Title } from "react-head";

import Constraint from "../components/Constraint";
import ContentLayout from "../components/ContentLayout";
import Breadcrumbs from "../components/Breadcrumbs";

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
    <ContentLayout pagePath="/apie-mus/">
      <Title>Apie projektą 🇺🇦 Suukraina.lt</Title>
      <Meta
        name="description"
        content="Reaguodami į koncentruotos informacijos stygių pagalbos Ukrainai klausimu, Laisvės TV kartu su Adapt Agency iniciavo projektą suukraina.lt."
      />

      {!!content && (
        <Constraint>
          <Breadcrumbs crumbs={crumbs} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </Constraint>
      )}
    </ContentLayout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: { regex: "//src/content/pages/apie-mus.md$/" }
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
