import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

import Section from "../Section";
import { HeroSectionPropTypes } from "./HeroSectionPropTypes";

const HeroSection = ({ image }) => {
  return (
    <Section className="HeroSectionB">
      {image && (
        <GatsbyImage
          className="HeroSectionB__background"
          image={getImage(image)}
          alt="Su Ukraina!"
        />
      )}
    </Section>
  );
};

HeroSection.propTypes = HeroSectionPropTypes;

export default HeroSection;
