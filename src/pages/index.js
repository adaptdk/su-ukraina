import * as React from "react";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import { Title, Meta } from "react-head";
import { graphql } from "gatsby";

// Components.
import Constraint from "../components/Constraint";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Layout from "../components/Layout";
import Section from "../components/Section";
import CtaCard from "../components/CtaCard";
import CtaCardItem from "../components/CtaCard/CtaCardItem";
import LinkCollection from "../components/LinkCollection";
import BeAwake from "../components/BeAwake";
import LinkCollectionItem from "../components/LinkCollection/LinkCollectionItem";
import PartnerList from "../components/PartnerList/PartnerList";
import Partner from "../components/Partner/Partner";

const Page = ({ data }) => {
  const partners = data.partners.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  return (
    <Layout>
      <Title>Привіт!</Title>
      <Meta
        name="description"
        content="Tinklalapis skirtas sutelkti informaciją apie krizę Ukrainoje."
      />
      <Section className="HeroSection">
        <StaticImage
          className="HeroSection__background"
          src="../images/hero-banner.jpg"
          alt="Su Ukraina!"
          layout="fullWidth"
        />
        <HeroBanner
          title="Su Ukraina iki pergalės!"
          subtitle="Tinklalapis skirtas sutelkti informaciją apie krizę Ukrainoje."
        >
          <Constraint className="HeroBanner__inner">
            <CtaCard
              title="Aukojimas"
              link="/kaip-galiu-padeti/aukojimas/"
              iconHandle="donate"
            >
              <CtaCardItem label="Lietuvoje" />
              <CtaCardItem label="Užsienyje" />
            </CtaCard>
            <CtaCard
              title="Savanorystė"
              link="/kaip-galiu-padeti/savanoryste/"
              iconHandle="volunteer"
            >
              <CtaCardItem label="Apgyvendinimas" />
              <CtaCardItem label="Pavežėjimas" />
              <CtaCardItem label="Pagalba gyvūnams" />
            </CtaCard>
          </Constraint>
        </HeroBanner>
      </Section>
      <Section className="ProtestFormsSection">
        <Constraint>
          <LinkCollection title="Protesto formos">
            <LinkCollectionItem
              to={`/protesto-formos/akcijos`}
              text={`Akcijos`}
            />
            <LinkCollectionItem
              to={`/protesto-formos/renginiai`}
              text={`Renginiai`}
            />
            <LinkCollectionItem
              to={`/protesto-formos/budinkite-veikti`}
              text={`Budinkite veikti`}
            />
          </LinkCollection>
        </Constraint>
      </Section>
      <Section className="BeAwakeSection">
        <Constraint>
          <BeAwake title="Būkime budrūs ir pasiruošę" />
        </Constraint>
      </Section>

      {partners.length > 0 && (
        <Section className="PartnerSection">
          <Constraint>
            <h2 className="Section__title">Mus turinio kūrimo prisideda</h2>
            <PartnerList>
              {partners.map((partner) => {
                const logo = partner.logo && (
                  <GatsbyImage
                    image={getImage(partner.logo)}
                    alt={partner.title}
                    height="80"
                  />
                );

                return (
                  <Partner
                    title={partner.title}
                    logo={logo}
                    website={partner.website}
                  />
                );
              })}
            </PartnerList>
          </Constraint>
        </Section>
      )}
    </Layout>
  );
};

export const query = graphql`
  query {
    partners: allFile(filter: { sourceInstanceName: { eq: "partners" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              website
              logo {
                childImageSharp {
                  gatsbyImageData(height: 100, placeholder: NONE)
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
  data: PropTypes.shape({
    partners: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                website: PropTypes.string,
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
