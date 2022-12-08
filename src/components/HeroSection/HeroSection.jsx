import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

import Section from "../Section";
import { HeroSectionPropTypes } from "./HeroSectionPropTypes";

const HeroSection = ({ image }) => {
  return (
    <Section className="HeroSectionB">
      {/* @todo: investigate why src is required */}
      {/* src="" required because otherwise console throws an error, even though it doesn't make sense here */}
      {image && (
        <GatsbyImage
          className="HeroSectionB__background"
          image={getImage(image)}
          alt="Su Ukraina!"
          src=""
        />
      )}
    </Section>
  );
};

HeroSection.propTypes = HeroSectionPropTypes;

export default HeroSection;
