import { graphql } from "gatsby";

// This whole file's logic should ideally be inside a component
export const query = graphql`
  fragment OrganisationFragment on ContentfulOrganisation {
    id
    name
    organisationType
    organisationLogo {
      gatsbyImageData(height: 30, placeholder: BLURRED, formats: WEBP)
    }
    location
    description {
      raw
    }
    purpose {
      raw
    }
    otherInformation {
      raw
    }
    websiteUrl
    actionUrl
  }
`;
