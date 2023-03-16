import React from "react";

import { LinkCollectionModulePropTypes } from "./LinkCollectionModulePropTypes";
import Button from "../../Button";
import Constraint from "../../Constraint";
import LinkCollectionWithImage from "../../LinkCollectionWithImage";
import Section from "../../Section";

import "./LinkCollectionModule.css";
import { graphql } from "gatsby";

const LinkCollectionModule = ({ links, heading, image }) => {
  if (image) {
    return (
      <Section className="BeVigilantSection">
        <Constraint>
          <LinkCollectionWithImage image={image} title={heading}>
            {links.map(({ id, url, label }) => {
              if (!label || !url) {
                return null;
              }
              return (
                <li key={id}>
                  <Button endIcon={`arrow-blue`} to={url} color={`transparent`}>
                    {label}
                  </Button>
                </li>
              );
            })}
          </LinkCollectionWithImage>
        </Constraint>
      </Section>
    );
  }
  return (
    <section className="LinkCollectionModule">
      {!!heading && <h2 className="LinkCollectionModule__title">{heading}</h2>}
      <ul className="LinkCollectionModule__button-list">
        {links.map((link) => {
          return (
            <li key={link.id}>
              <Button endIcon={`arrow-white`} to={link.url} color={`primary`}>
                {link.label}
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

LinkCollectionModule.propTypes = LinkCollectionModulePropTypes;

LinkCollectionModule.defaultProps = {
  title: ``,
};

export default LinkCollectionModule;

export const query = graphql`
  fragment LinkCollectionModuleFragment on ContentfulLinkCollectionModule {
    heading
    image {
      gatsbyImageData(
        formats: WEBP
        height: 440
        width: 611
        placeholder: BLURRED
      )
    }
    links {
      ...LinkFragment
    }
  }
`;
