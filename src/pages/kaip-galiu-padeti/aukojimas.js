import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Meta } from "react-head";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";
import Button from "../../components/Button";
import CardSection from "../../components/Card/CardSection";
import Section from "../../components/Section";
import SlidingNavigation from "../../components/SlidingNavigation";
import TitledSection from "../../components/TitledSection/TitledSection";
import PageTitle from "../../components/PageTitle";

const CardListSection = ({ organisations }) => {
  return (
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
            {!!organisation.about && (
              <CardSection title="Apie" content={organisation.about} />
            )}
            {!!organisation.cause && (
              <CardSection title="Paskirtis" content={organisation.cause} />
            )}
            {!!organisation.rekvizitai && (
              <CardSection
                title="Kita informacija"
                content={organisation.rekvizitai}
              />
            )}

            <div className={`Card__actions`}>
              {!!organisation.support_link && (
                <Button
                  endIcon={`arrow-white`}
                  href={organisation.support_link}
                  color={`primary`}
                  target="_blank"
                >
                  Paremti
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
            </div>
          </Card>
        );
      })}
    </CardList>
  );
};

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

  const organisations = data.organisations.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const lithuanianOrganisations = organisations.filter((organisation) => {
    return organisation.location === `Lietuvoje`;
  });
  const foreignOrganisations = organisations.filter((organisation) => {
    return organisation.location === `Užsienyje`;
  });

  const slidingNavData = [
    {
      title: `Lietuvoje`,
      linkId: `lietuvoje`,
      icon: `house`,
      data: lithuanianOrganisations,
    },
    {
      title: `Užsienyje`,
      linkId: `uzsienyje`,
      icon: `foreign`,
      data: foreignOrganisations,
    },
  ];

  return (
    <Layout pagePath="/kaip-galiu-padeti/aukojimas/">
      <PageTitle title="Aukojimas Ukrainai ir jos piliečiams" />
      <Meta
        name="description"
        content="Aukojimas Ukrainai ir jos piliečiams 🇺🇦 Suukraina.lt"
      />

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../images/hero/aukojimas.jpg"
          alt="Su Ukraina!"
          layout="fullWidth"
        />
      </Section>

      {!!content && (
        <Constraint>
          <NavigationGroup crumbs={crumbs} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </Constraint>
      )}

      <Constraint className="Constraint--sliding-nav">
        <SlidingNavigation data={slidingNavData} />
        {slidingNavData.map((item) => {
          return (
            <TitledSection
              key={item.linkId}
              id={item.linkId}
              title={item.title}
              icon={item.icon}
            >
              <CardListSection organisations={item.data} />
            </TitledSection>
          );
        })}
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
          regex: "//src/content/pages/kaip-galiu-padeti/aukojimas.md$/"
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
      filter: { sourceInstanceName: { eq: "orgs-for-donating" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              about
              cause
              rekvizitai
              title
              website
              support_link
              location
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
              frontmatter: PropTypes.object,
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
              frontmatter: PropTypes.object,
            }),
          }),
        })
      ),
    }),
  }),
};

CardListSection.propTypes = {
  organisations: PropTypes.arrayOf(
    PropTypes.shape({
      about: PropTypes.string,
      cause: PropTypes.string,
      rekvizitai: PropTypes.string,
      title: PropTypes.string,
      website: PropTypes.string,
      support_link: PropTypes.string,
      logo: PropTypes.object,
      location: PropTypes.string,
    })
  ),
};

export default Page;
