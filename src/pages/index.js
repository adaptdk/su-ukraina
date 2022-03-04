import * as React from "react";
import Constraint from "../components/Constraint";
import HeroBanner from "../components/HeroBanner/HeroBanner";

import Layout from "../components/Layout";
import Section from "../components/Section";
import { StaticImage } from "gatsby-plugin-image"
import CtaCard from "../components/CtaCard";
import CtaCardItem from "../components/CtaCard/CtaCardItem";

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
              <CtaCardItem label="Pavežėjimass"/>
              <CtaCardItem label="Pagalba gyūnams"/>
            </CtaCard>
          </Constraint>
        </HeroBanner>
      </Section>
    </Layout>
  );
};

export default Page;
