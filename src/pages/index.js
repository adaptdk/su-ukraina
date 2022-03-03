import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Linkify from "react-linkify";

import "./index.css";

const IndexPage = ({ data }) => {
  const organisations = data.allFile.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  return (
    <main>
      <title>Привіт!</title>
      <h1>Labas</h1>
      <p>
        Русский корабль, иди нахуй
        {` `}
        <span role="img" aria-label="Ukrainos vėliava">
          🇺🇦
        </span>
      </p>

      {organisations.map((organisation, i) => {
        return (
          <article key={i}>
            <h2>{organisation.title}</h2>

            <h3>Paskirtis</h3>
            <div>
              <Linkify>{organisation.cause}</Linkify>
            </div>

            <h3>Apie</h3>
            <div>
              <Linkify>{organisation.about}</Linkify>
            </div>

            <h3>Forma</h3>
            <div>
              <ul>
                {organisation.forma.map((forma, j) => {
                  return <li key={j}>{forma}</li>;
                })}
              </ul>
            </div>

            <h3>Rekvizitai/registracija</h3>
            <div>
              <Linkify>{organisation.rekvizitai}</Linkify>
            </div>

            <h3>Oficialus puslapis</h3>
            <div>
              <Linkify>{organisation.website}</Linkify>
            </div>
          </article>
        );
      })}
    </main>
  );
};

export const query = graphql`
  query {
    allFile(
      filter: { sourceInstanceName: { eq: "organisations" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              about
              cause
              forma
              rekvizitai
              title
              website
            }
          }
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                about: PropTypes.string,
                cause: PropTypes.string,
                forma: PropTypes.array,
                rekvizitai: PropTypes.string,
                title: PropTypes.string,
                website: PropTypes.string,
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default IndexPage;
