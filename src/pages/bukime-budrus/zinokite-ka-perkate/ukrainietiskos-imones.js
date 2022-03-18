import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import ZinokiteKaPerkate from "../../../shared-pages/ZinokiteKaPerkate";

const Page = ({ data }) => {
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const companies = data.companies.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  return (
    <ZinokiteKaPerkate
      content={content}
      companies={companies}
      pagePath="/bukime-budrus/zinokite-ka-perkate/ukrainietiskos-imones/"
      introText="Pateikiame patikrintą sąrašą pilnai arba dalinai Ukrainietiško kapitalo verslo subjektų; verslų, kurių produkciją pirkdami galite bent truputį prisidėti prie nepriklausomos Ukrainos ateities"
    />
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: {
          regex: "//src/content/pages/bukime-budrus/zinokite-ka-perkate.md$/"
        }
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
    companies: allFile(
      filter: { sourceInstanceName: { eq: "companies-ukraine" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              description
              country
              image_url
              information {
                description
                type
                source
              }
            }
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
    companies: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                country: PropTypes.string,
                image_url: PropTypes.string,
                information: PropTypes.arrayOf(
                  PropTypes.shape({
                    description: PropTypes.string,
                    type: PropTypes.string,
                    source: PropTypes.string,
                  })
                ),
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
