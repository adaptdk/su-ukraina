import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Title, Meta } from "react-head";
import { StaticImage } from "gatsby-plugin-image";

import ContactChip from "../../components/ContactChip";
import ContactChipSections from "../../components/ContactChipSections";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";
import Section from "../../components/Section";

const Page = ({ data }) => {
  const crumbs = [`Būkime budrūs`, `Patikima informacija`];
  const additionalNavigation = [`sukčiai ir dezinformacija`];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const infoOrgs = data.infoOrgs.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const infoPeople = data.infoPeople.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const infoForeign = data.infoForeign.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  return (
    <Layout pagePath="/bukime-budrus/patikima-informacija/">
      <Title>Patikima informacija</Title>

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../images/hero/patikima_informacija.jpg"
          alt="Budinkite veikti"
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
        <ContactChipSections>
          <details open>
            <summary>
              <h2>
                <span className="ContactChipSections__icon ContactChipSections__icon--people"></span>
                Asmenybės
              </h2>
            </summary>
            {infoPeople.map((person, i) => {
              return (
                <ContactChip
                  description={person.description}
                  url={person.url}
                  facebookUrl={person.facebook}
                  twitterUrl={person.twitter}
                  key={i}
                >
                  {person.title}
                </ContactChip>
              );
            })}
          </details>
          <details open>
            <summary>
              <h2>
                <span className="ContactChipSections__icon ContactChipSections__icon--institutions"></span>
                Institucijos
              </h2>
            </summary>
            {infoOrgs.map((org, i) => {
              return (
                <ContactChip
                  description={org.description}
                  url={org.url}
                  facebookUrl={org.facebook}
                  twitterUrl={org.twitter}
                  key={i}
                >
                  {org.title}
                </ContactChip>
              );
            })}
          </details>
        </ContactChipSections>
        <ContactChipSections>
          <details open>
            <summary>
              <h2>
                <span className="ContactChipSections__icon ContactChipSections__icon--foreign"></span>
                Užsienio šaltiniai
              </h2>
            </summary>
            {infoForeign.map((foreignSource, i) => {
              return (
                <ContactChip
                  description={foreignSource.description}
                  url={foreignSource.url}
                  facebookUrl={foreignSource.facebook}
                  twitterUrl={foreignSource.twitter}
                  key={i}
                >
                  {foreignSource.title}
                </ContactChip>
              );
            })}
          </details>
        </ContactChipSections>
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
          regex: "//src/content/pages/bukime-budrus/patikima-informacija.md$/"
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
    infoPeople: allFile(
      filter: { sourceInstanceName: { eq: "info-people" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              description
              url
              facebook
              twitter
              weight
            }
          }
        }
      }
    }
    infoForeign: allFile(
      filter: { sourceInstanceName: { eq: "info-foreign" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              description
              url
              facebook
              twitter
              weight
            }
          }
        }
      }
    }
    infoOrgs: allFile(
      filter: { sourceInstanceName: { eq: "info-orgs" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              description
              url
              facebook
              twitter
              weight
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
    infoForeign: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                url: PropTypes.string,
                facebook: PropTypes.string,
                twitter: PropTypes.string,
              }),
            }),
          }),
        })
      ),
    }),
    infoPeople: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                url: PropTypes.string,
                facebook: PropTypes.string,
                twitter: PropTypes.string,
              }),
            }),
          }),
        })
      ),
    }),
    infoOrgs: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                url: PropTypes.string,
                facebook: PropTypes.string,
                twitter: PropTypes.string,
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
