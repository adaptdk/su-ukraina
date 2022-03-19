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
import LinkCollectionWithImage from "../components/LinkCollectionWithImage";
import LinkCollectionItem from "../components/LinkCollection/LinkCollectionItem";
import PartnerList from "../components/PartnerList/PartnerList";
import Partner from "../components/Partner/Partner";
import Button from "../components/Button";

// Constants.
import { NAVIGATION_PROTEST_FORMS } from "../constants/Navigation";
import { NAVIGATION_BE_VIGILANT } from "../constants/Navigation";
import PromoLine from "../components/PromoLine";

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
        <HeroBanner title="Su Ukraina iki pergalės!">
          <Constraint className="HeroBanner__inner">
            <CtaCard
              title="Aukojimas"
              link="/kaip-galiu-padeti/aukojimas/lietuvoje/"
              iconHandle="donate"
            />
            <CtaCard
              title="Savanorystė"
              link="/kaip-galiu-padeti/savanoryste/"
              iconHandle="volunteer"
            />
            <CtaCard
              title="Pasiūlyk pagalbą ukrainiečiams"
              link="https://0rs0r9mdix1.typeform.com/to/QXLxIUjt"
              iconHandle="ua-flag"
              target="_blank"
            />
          </Constraint>
        </HeroBanner>
      </Section>
      <Section>
        <PromoLine
          title="ВСЯ ВАЖЛИВА ІНФОРМАЦІЯ ДЛЯ ГРОМАДЯН УКРАЇНИ"
          titleLink="https://www.withukraine.lt"
          modifier="big"
        >
          <Button
            icon={`arrow-blue`}
            href="https://www.withukraine.lt/info"
            color={`secondary`}
            text={`ІНФОРМАЦІЯ`}
            position={`right`}
            target="_blank"
            rel="noopener nofollow"
          />
          <Button
            icon={`arrow-blue`}
            href="https://www.withukraine.lt"
            color={`secondary`}
            text={`послуги`}
            position={`right`}
            target="_blank"
            rel="noopener nofollow"
          />
        </PromoLine>
      </Section>
      {/* <Section className="ProtestFormsSection">
        <Constraint>
          <LinkCollection title="Protesto formos">
            {NAVIGATION_PROTEST_FORMS.map((item) => (
              <LinkCollectionItem
                key={item.pathname}
                to={item.pathname}
                text={item.title}
              />
            ))}
          </LinkCollection>
        </Constraint>
      </Section> */}
      <Section className="BeVigilantSection">
        <Constraint>
          <LinkCollectionWithImage title="Būkime budrūs ir pasiruošę">
            {NAVIGATION_BE_VIGILANT.map((item) => (
              <li key={item.pathname}>
                <Button
                  icon={`arrow-blue`}
                  to={item.pathname}
                  color={`transparent`}
                  text={item.altTitle || item.title}
                  position={`right`}
                />
              </li>
            ))}
          </LinkCollectionWithImage>
        </Constraint>
      </Section>

      {partners.length > 0 && (
        <Section className="PartnerSection">
          <Constraint>
            <h2 className="Section__title">Prie turinio kūrimo prisideda</h2>
            <PartnerList>
              {partners.map((partner, i) => {
                const logo = partner.logo && (
                  <GatsbyImage
                    image={getImage(partner.logo)}
                    alt={partner.title}
                    height="80"
                  />
                );

                return (
                  <Partner
                    key={i}
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
