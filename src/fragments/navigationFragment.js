import { graphql } from "gatsby";

export const query = graphql`
  fragment NavigationFragment on ContentfulNavigation {
    node_locale
    items {
      id
      title
      slug
      items {
        ... on ContentfulNavigationItem {
          id
          title
          slug
        }
      }
    }
  }
`;
