import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Title } from "react-head";

// Components.
import Constraint from "../components/Constraint";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Layout from "../components/Layout";
import Section from "../components/Section";
import CtaCard from "../components/CtaCard";
import CtaCardItem from "../components/CtaCard/CtaCardItem";
import CtaLink from "../components/CtaLink";
import ProtestForms from "../components/ProtestForms";
import ContentWithImage from "../components/ContentWithImage";

const Page = () => {
  return (
    <Layout>
      <Title>Привіт!</Title>
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
              title="Savanoriavimas"
              link="/kaip-galiu-padeti/savanoryste/"
              iconHandle="volunteer"
            >
              <CtaCardItem label="Apgyvendinimas" />
              <CtaCardItem label="Pavežėjimas" />
              <CtaCardItem label="Pagalba gyūnams" />
            </CtaCard>
          </Constraint>
        </HeroBanner>
      </Section>
      <Section className="ProtestFormsSection">
        <Constraint>
          <ProtestForms title="Protesto formos"/>
        </Constraint>
      </Section>
      <Section className="ContentWithImageSection">
        <Constraint>
          <ContentWithImage title="Būkime budrūs ir pasiruošę">
            <CtaLink
              url="/bukime-budrus/patikima-informacija"
              title="Patikima informacija"
            />
            <CtaLink
              url="/bukime-budrus/piliecio-atmintine"
              title="Piliečio atmintinė"
            />
            {/* <CtaLink url="/bukime-budrus/kaip-apsisaugoti-nuo-sukciu" title="Kaip apsisaugoti nuo sukčių?"/>*/}
          </ContentWithImage>
        </Constraint>
      </Section>
    </Layout>
  );
};

export default Page;
