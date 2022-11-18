import * as React from "react";
import PropTypes from "prop-types";
import { Meta } from "react-head";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

// Components.
import Constraint from "../components/Constraint";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Layout from "../components/Layout";
import Section from "../components/Section";
import CtaCard from "../components/CtaCard";
import LinkCollectionWithImage from "../components/LinkCollectionWithImage";
import PartnerList from "../components/PartnerList/PartnerList";
import Partner from "../components/Partner/Partner";
import Button from "../components/Button";
import PageTitle from "../components/PageTitle";

// Constants.
import {
  NAVIGATION_HOW_CAN_I_HELP,
  NAVIGATION_EXTERNAL_LINK_PROVIDE_HELP,
  NAVIGATION_ITEM_REFUGEE_GUIDE,
  NAVIGATION_MAIN_MENU_ALT,
  NAVIGATION_BE_VIGILANT,
} from "../constants/Navigation";
import PromoLine from "../components/PromoLine";

//Meta data, I don't know how to handle this
import OgImage from "../images/og-image.png";

const Page = ({ data }) => {
  const partners = data.partners.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const infoPartners = [];
  const contentPartners = [];
  const techPartners = [];
  const institutionalPartners = [];

  if (partners.length > 0) {
    partners.forEach((partner) => {
      const type = partner.category;

      if (type === `informacinis`) {
        return infoPartners.push(partner);
      }
      if (type === `institucinis`) {
        return institutionalPartners.push(partner);
      }
      if (type === `technologinis`) {
        return techPartners.push(partner);
      }
      if (type === `turinio`) {
        return contentPartners.push(partner);
      }
    });
  }

  return (
    <Layout>
      <PageTitle title="Parama Ukrainai | Kartu iki pergalės!" />
      <Meta
        name="description"
        content="Parama Ukrainai ir jos piliečiams Lietuvoje. Svarbiausia informacija apie finansinę, emocinę pagalba Ukrainai. Savanorystės galimybės. Kviečiame padėti ➔"
      />
      <Meta property="og:image" content={OgImage} />
      <Section className="HeroSection">
        <StaticImage
          className="HeroSection__background"
          src="../images/hero-banner.jpg"
          alt="Su Ukraina!"
          layout="fullWidth"
        />
        <HeroBanner title="Parama Ukrainai iki pergalės!">
          <Constraint className="HeroBanner__inner">
            {NAVIGATION_HOW_CAN_I_HELP.map((item) => {
              return (
                <CtaCard
                  key={item.pathname}
                  title={item.title}
                  link={item.pathname}
                  iconHandle={item.iconHandle}
                />
              );
            })}
            <CtaCard
              title={NAVIGATION_EXTERNAL_LINK_PROVIDE_HELP.title}
              link={NAVIGATION_EXTERNAL_LINK_PROVIDE_HELP.url}
              iconHandle={NAVIGATION_EXTERNAL_LINK_PROVIDE_HELP.iconHandle}
              target="_blank"
            />
          </Constraint>
        </HeroBanner>
      </Section>
      <Section>
        <PromoLine
          title="Вся важлива інформація для громадян України"
          titleLink={NAVIGATION_ITEM_REFUGEE_GUIDE.pathname}
          large={true}
        >
          {NAVIGATION_MAIN_MENU_ALT.map((item) => {
            return (
              <Button
                key={item.pathname}
                endIcon={`arrow-blue`}
                to={item.pathname}
                color={`secondary`}
                target="_blank"
                rel="noopener"
              >
                {item.altTitle || item.title}
              </Button>
            );
          })}
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
            {NAVIGATION_BE_VIGILANT.map((item) => {
              return (
                <li key={item.pathname}>
                  <Button
                    endIcon={`arrow-blue`}
                    to={item.pathname}
                    color={`transparent`}
                  >
                    {item.altTitle || item.title}
                  </Button>
                </li>
              );
            })}
          </LinkCollectionWithImage>
        </Constraint>
      </Section>

      {partners.length > 0 && (
        <Section className="PartnerSection">
          <Constraint>
            <h2 className="Section__title">Puslapio partneriai</h2>

            {infoPartners.length > 0 && (
              <div className="PartnerSection__category">
                <h3>Informaciniai</h3>
                <PartnerList>
                  {infoPartners.map((partner, i) => {
                    return (
                      <Partner
                        key={i}
                        title={partner.title}
                        logo={partner.logo}
                        website={partner.website}
                      />
                    );
                  })}
                </PartnerList>
              </div>
            )}

            {contentPartners.length > 0 && (
              <div className="PartnerSection__category">
                <h3>Turinio</h3>
                <PartnerList>
                  {contentPartners.map((partner, i) => {
                    return (
                      <Partner
                        key={i}
                        title={partner.title}
                        logo={partner.logo}
                        website={partner.website}
                      />
                    );
                  })}
                </PartnerList>
              </div>
            )}

            {techPartners.length > 0 && (
              <div className="PartnerSection__category">
                <h3>Technologiniai</h3>
                <PartnerList>
                  {techPartners.map((partner, i) => {
                    return (
                      <Partner
                        key={i}
                        title={partner.title}
                        logo={partner.logo}
                        website={partner.website}
                      />
                    );
                  })}
                </PartnerList>
              </div>
            )}

            {institutionalPartners.length > 0 && (
              <div className="PartnerSection__category">
                <h3>Instituciniai</h3>
                <PartnerList>
                  {institutionalPartners.map((partner, i) => {
                    return (
                      <Partner
                        key={i}
                        title={partner.title}
                        logo={partner.logo}
                        website={partner.website}
                      />
                    );
                  })}
                </PartnerList>
              </div>
            )}
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
              category
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
                category: PropTypes.string,
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
