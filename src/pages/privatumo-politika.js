import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Constraint from "../components/Constraint";
import ContentLayout from "../components/ContentLayout";

const Page = ({ data }) => {
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  })[0];

  return (
    <ContentLayout pagePath="/privatumo-politika/">
      <title>Privatumo politika</title>

      {!!content && (
        <Constraint>
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
        absolutePath: { regex: "//src/content/pages/privatumo-politika.md$/" }
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
