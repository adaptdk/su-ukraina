import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Title, Meta } from "react-head";
import { StaticImage } from "gatsby-plugin-image";

import ContactChip from "../components/ContactChip";
import ContactChipSections from "../components/ContactChipSections";
import Constraint from "../components/Constraint";
import Layout from "../components/Layout";
import NavigationGroup from "../components/NavigationGroup";
import Section from "../components/Section";
import SlidingNavigation from "../components/SlidingNavigation";

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

  const infoOrgs = data.infoOrgs.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const infoPeople = data.infoPeople.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const infoForeign = data.infoForeign.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const slidingNavData = [
    {
      title: `Asmenybės`,
      linkId: `people`,
      icon: `people`,
      data: infoPeople,
    },
    {
      title: `Institucijos`,
      linkId: `institutions`,
      icon: `institutions`,
      data: infoOrgs,
    },
    {
      title: `Užsienio šaltiniai`,
      linkId: `foreign`,
      icon: `foreign`,
      data: infoForeign,
    },
  ];

  return (
    <Layout pagePath="/patikimi-saltiniai/">
      <Title>Patikimi šaltiniai</Title>

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../images/hero/patikima_informacija.jpg"
          alt="Budinkite veikti"
          layout="fullWidth"
        />
      </Section>

      {!!content && (
        <Constraint>
          <NavigationGroup crumbs={crumbs} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint className="Constraint--contact-chip-sections">
        <ContactChipSections>
          <SlidingNavigation data={slidingNavData} />
          {slidingNavData.map((item) => {
            return (
              <div
                key={item.title}
                id={item.linkId}
                className="ContactChipSections__container"
              >
                <div className="ContactChipSections__title-wrapper">
                  <h2 className="ContactChipSections__title">
                    {!!item.icon && (
                      <span
                        className={`ContactChipSections__icon ContactChipSections__icon--${item.icon}`}
                      />
                    )}
                    {item.title}
                  </h2>
                </div>
                <div className="ContactChipSections__articles">
                  {item.data.map((unit) => {
                    return (
                      <ContactChip
                        key={unit.title + unit.description}
                        description={unit.description}
                        url={unit.url}
                        facebookUrl={unit.facebook}
                        twitterUrl={unit.twitter}
                      >
                        {unit.title}
                      </ContactChip>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
        absolutePath: { regex: "//src/content/pages/patikimi-saltiniai.md$/" }
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
