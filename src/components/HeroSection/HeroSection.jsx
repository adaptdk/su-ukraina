import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

import Section from "../Section";
import {
  HeroSectionDefaultProps,
  HeroSectionPropTypes,
} from "./HeroSectionPropTypes";

const HeroSection = ({ heroTitle, heroImage }) => {
  return (
    <Section className="HeroSectionB">
      {/* @todo: investigate why src is required */}
      {/* src="" required because otherwise console throws an error, even though it doesn't make sense here */}
      {heroImage && (
        <GatsbyImage
          className="HeroSectionB__background"
          image={getImage(heroImage)}
          alt="Su Ukraina!"
          src=""
        />
      )}
      {/* @todo: fix */}
      {heroTitle && <h1>{heroTitle}</h1>}
    </Section>
  );
};

HeroSection.propTypes = HeroSectionPropTypes;

HeroSection.defaultProps = HeroSectionDefaultProps;

export default HeroSection;
