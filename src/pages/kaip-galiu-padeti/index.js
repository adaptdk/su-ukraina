import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import { Title, Meta } from "react-head";

import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumbs";

const Page = ({ data }) => {
  const crumbs = [`Kaip galiu padėti?`];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  return (
    <Layout pagePath="/kaip-galiu-padeti/">
      <Title>Kaip galiu padėti?</Title>

      {!!content && (
        <Constraint>
          <Breadcrumb crumbs={crumbs} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint>
        <nav>
          <ul>
            <li>
              <Link to="/kaip-galiu-padeti/aukojimas/">Aukojimas</Link>
            </li>
            <li>
              <Link to="/kaip-galiu-padeti/savanoryste/">Savanorystė</Link>
            </li>
          </ul>
        </nav>
      </Constraint>
    </Layout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: { regex: "//src/content/pages/kaip-galiu-padeti.md$/" }
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
  }),
};

export default Page;
