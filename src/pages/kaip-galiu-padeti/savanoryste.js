import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { Title, Meta } from "react-head";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";
import CardSection from "../../components/Card/CardSection";
import Button from "../../components/Button";
import Section from "../../components/Section";

const Page = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext;
  const additionalNavigation = [`Aukojimas`];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const organisations = data.organisations.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  return (
    <Layout pagePath="/kaip-galiu-padeti/savanoryste/">
      <Title>Savanorystė</Title>

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../images/hero/savanoryste.jpg"
          alt="Su Ukraina!"
          layout="fullWidth"
        />
      </Section>

      {!!content && (
        <Constraint>
          <NavigationGroup
            crumbs={crumbs}
            additionalNav={additionalNavigation}
          />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint>
        <CardList>
          {organisations.map((organisation, i) => {
            const logo = organisation.logo && (
              <GatsbyImage
                image={getImage(organisation.logo)}
                alt={organisation.title}
              />
            );
            return (
              <Card title={organisation.title} logo={logo} key={i}>
                {!!organisation.cause && (
                  <CardSection title="Paskirtis" content={organisation.cause} />
                )}
                {!!organisation.about && (
                  <CardSection title="Apie" content={organisation.about} />
                )}
                {!!organisation.rekvizitai && (
                  <CardSection
                    title="Kita informacija"
                    content={organisation.rekvizitai}
                  />
                )}

                {/* <h3>Forma</h3>
                <div>
                  <ul>
                    {organisation.forma.map((forma, j) => {
                      return <li key={j}>{forma}</li>;
                    })}
                  </ul>
                </div> */}

                <div className={`Card__actions`}>
                  {!!organisation.action && (
                    <Button
                      endIcon={`arrow-white`}
                      href={organisation.action}
                      color={`primary`}
                      target="_blank"
                    >
                      Pildyti formą
                    </Button>
                  )}

                  {!!organisation.website && (
                    <Button
                      endIcon={`arrow-blue`}
                      href={organisation.website}
                      color={`transparent`}
                      target="_blank"
                    >
                      Oficialus puslapis
                    </Button>
                  )}

                  {organisation.location}
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
          regex: "//src/content/pages/kaip-galiu-padeti/savanoryste.md$/"
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
    organisations: allFile(
      filter: { sourceInstanceName: { eq: "orgs-for-volunteering" } }
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
              action
              logo {
                childImageSharp {
                  gatsbyImageData(height: 30, placeholder: NONE)
                }
              }
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
    organisations: PropTypes.shape({
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
                action: PropTypes.string,
                logo: PropTypes.object,
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
