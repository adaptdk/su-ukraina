import { graphql } from "gatsby";

export const query = graphql`
  fragment LinkFragment on ContentfulLink {
    id
    label
    url
    sublabel
  }
`;
