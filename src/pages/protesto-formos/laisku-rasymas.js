import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Linkify from "react-linkify";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumbs";

const Page = ({ data }) => {
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  })[0];

  const addressees = data.addressees.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  return (
    <Layout>
      {(!content || !content.title) && <title>Laiškų rašymas</title>}

      {!!content && (
        <Constraint>
          <Breadcrumb crumbs={[`Titulinis`, `Darykite spaudimą`]} />
          <title>{content.title}</title>
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </Constraint>
      )}

      <Constraint>
        <CardList>
          {addressees.map((addressee, i) => {
            return (
              <Card title={addressee.title} key={i}>
                <div>
                  <ul>
                    {addressee.type.map((singleType, j) => {
                      return <li key={j}>{singleType}</li>;
                    })}
                  </ul>
                </div>

                <h3>Klausimas, dėl kurio galima kreiptis</h3>
                <div>
                  <Linkify>{addressee.purpose}</Linkify>
                </div>

                <h3>El. pašto adresas ar kitas skaitmeninis kanalas</h3>
                <div>
                  <Linkify>{addressee.emailOrLink}</Linkify>
                </div>

                <h3>Adresas</h3>
                <div>
                  <Linkify>{addressee.address}</Linkify>
                </div>
              </Card>
            );
          })}
        </CardList>
      </Constraint>
    </Layout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: {
          regex: "//src/content/pages/protesto-formos/laisku-rasymas.md$/"
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
          }
        }
      }
    }
    addressees: allFile(
      filter: { sourceInstanceName: { eq: "addressees" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              type
              title
              purpose
              emailOrLink
              address
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
          }),
        })
      ),
    }),
    addressees: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                type: PropTypes.array,
                title: PropTypes.string,
                purpose: PropTypes.string,
                emailOrLink: PropTypes.string,
                address: PropTypes.string,
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
