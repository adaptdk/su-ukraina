import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Constraint from "../components/Constraint";
import ContentLayout from "../components/ContentLayout";
import Breadcrumb from "../components/Breadcrumbs";

const Page = ({ data }) => {
  const crumbs = [`Kontaktai`];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  })[0];

  return (
    <ContentLayout pagePath="/apie-mus/">
      <title>Kontaktai</title>

      {!!content && (
        <Constraint>
          <Breadcrumb crumbs={crumbs} />
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
        absolutePath: { regex: "//src/content/pages/kontaktai.md$/" }
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
