// not querying heroTitle yet because none of the heros have a title
const hero = `
  heroImage {
    gatsbyImageData(
      width: 1440
      height: 148
      placeholder: BLURRED
      formats: WEBP
      layout: FULL_WIDTH
    )
  }
`;

const seo = `
  metaTitle
  metaDescription
`;

const link = `
  id
  label
  url
  sublabel
`;

const linkCollectionModule = `
  heading
  subheading
  variant
  image {
    gatsbyImageData(
      formats: WEBP
      height: 440
      width: 611
      placeholder: BLURRED
    )
  }
  links {
    ... on ContentfulLink {
      ${link}
    }
  }
`;

const organisation = `
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
`;

const eventItem = `
  id
  starred
  eventType
  title
  organizer
  startDate
  endDate
  location
  description {
    raw
  }
  eventUrl
`;

const eventsModule = `
  events {
    ... on ContentfulEventItem {
      ${eventItem}
    }
  }
`;

const chip = `
  id
  heading
  subheading
  webUrl
  facebookUrl
  twitterUrl
`;

const chipModule = `
  chips {
    ... on ContentfulChip {
      ${chip}
    }
  }
`;

const slidingNavBlock = `
  title
  icon
  data {
    ... on ContentfulChipModule {
      id
      internal {
        type
      }
      ${chipModule}
    }
  }
`;

const resourceItem = `
  id
  label
  subtext
  sourceUrl
`;

const resourceListModule = `
  heading
  subheadingRich: subheading {
    raw
  }
  resources {
    ... on ContentfulResourceItem {
      ${resourceItem}
    }
  }
`;

const helpSearchModule = `
  defaultResultsLang
`;

const faqItem = `
  question
  answer {
    raw
    references {
      ... on ContentfulAsset {
        id
        contentful_id
        internal {
          type
        }
        file {
          contentType
        }
        gatsbyImageData(formats: WEBP, placeholder: BLURRED)
      }
      ... on ContentfulResourceItem {
        contentful_id
        internal {
          type
        }
        ${resourceItem}
      }
    }
  }
`;

const partnersModule = `
  heading
  partnerCollections {
    ... on ContentfulPartnerCollection {
      id
      category
      partners {
        ... on ContentfulPartner {
          id
          label
          url
          logo {
            gatsbyImageData(height: 80, placeholder: BLURRED, formats: WEBP)
          }
        }
      }
    }
  }
`;

const faqCategoriesModule = `
  heading
  seeAllLink
  categories {
    id
    slug
    pageHeading
    iconType
  }
`;

// the contentful_id is the same as the entry id in URL
const globalNavigation = `
  allContentfulNavigation(filter: {contentful_id: { eq: "1yKThqiNevVEU4BCn7zZ9y" }}) {
    edges {
      node {
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
    }
  }
`;

const pageData = `
  id
  slug
  pageHeading
  pageDescription {
    raw
  }
`;

const promoLine = `
  allContentfulPromoLineModule(filter: { contentful_id: { eq: "1zlccw24eib2cd3wTXRHfk" }}) {
    edges {
      node {
        id
        node_locale
        contentful_id
        heading
        subheading
        headingLink
        linkButtons {
          ... on ContentfulLink {
            ${link}
          }
        }
      }
    }
  }
`;

const promotionBannerModule = `
  heading
  thumbnail {
    gatsbyImageData(
      formats: WEBP
      height: 600
      width: 600
      placeholder: BLURRED
    )
  }
  thumbnailUrl
  content {
    ... on Node {
      id
      internal {
        type
      }
      ... on ContentfulEventItem {
        contentful_id
        ${eventItem}
      }
      ... on ContentfulOrganisation {
        contentful_id
        ${organisation}
      }
    }
  }
`;

const stepsModule = `
  steps {
    ... on Node {
      id
      internal {
        type
      }
      ... on ContentfulFaqItem {
        ${faqItem}
      }
    }
  }
`;

module.exports = {
  hero,
  seo,
  organisation,
  link,
  linkCollectionModule,
  eventItem,
  eventsModule,
  slidingNavBlock,
  chipModule,
  partnersModule,
  faqItem,
  faqCategoriesModule,
  resourceListModule,
  helpSearchModule,
  globalNavigation,
  pageData,
  promoLine,
  promotionBannerModule,
  stepsModule,
};
