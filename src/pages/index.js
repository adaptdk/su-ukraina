import * as React from "react";

// Components.
import Constraint from "../components/Constraint";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Layout from "../components/Layout";
import Section from "../components/Section";
import { StaticImage } from "gatsby-plugin-image"
import CtaCard from "../components/CtaCard";
import CtaCardItem from "../components/CtaCard/CtaCardItem";
import CtaLink from '../components/CtaLink';
import ContentWithImage from '../components/ContentWithImage';

const Page = () => {
  return (
    <Layout>
      <title>Привіт!</title>
      <Section customClass="HeroSection">
        <StaticImage src="../images/hero-banner.jpg" alt="Su Ukraina!" />
        <HeroBanner title="Su Ukraina iki pergalės!" subtitle="Tinklalapis skirtas sutelkti informaciją apie krizę Ukrainoje.">
          <Constraint customClass="HeroBanner__inner">
            <CtaCard title="Aukojimas" link="/kaip-galiu-padeti/aukojimas/" iconHandle="donate">
              <CtaCardItem label="Lietuvoje"/>
              <CtaCardItem label="Užsienyje"/>
            </CtaCard>
            <CtaCard title="Savanoriavimas" link="/kaip-galiu-padeti/savanoryste/" iconHandle="volunteer">
              <CtaCardItem label="Apgyvendinimas"/>
              <CtaCardItem label="Pavežėjimas"/>
              <CtaCardItem label="Pagalba gyūnams"/>
            </CtaCard>
          </Constraint>
        </HeroBanner>
      </Section>
      <Section customClass="ContentWithImageSection">
        <Constraint>
          <ContentWithImage title="Būkime budrūs ir pasiruošę">
            <CtaLink url="/bukime-budrus/patikima-informacija" title="Patikima informacija"/>
            <CtaLink url="/bukime-budrus/piliecio-atmintine" title="Piliečio atmintinė"/>
            <CtaLink url="/bukime-budrus/kaip-apsisaugoti-nuo-sukciu" title="Kaip apsisaugoti nuo sukčių?"/>
          </ContentWithImage>
        </Constraint>
      </Section>
    </Layout>
  );
};

export default Page;
