import { graphql } from "gatsby";

export const query = graphql`
  fragment SeoFragment on ContentfulModularPage {
    metaTitle
    metaDescription
  }
`;
