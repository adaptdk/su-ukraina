// not querying heroTitle yet because none of the heros have a title
const hero = `
  heroImage {
    gatsbyImageData(height: 148, placeholder: BLURRED, formats: WEBP)
  }
`;

const seo = `
  metaTitle
  metaDescription
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

const faqNavigation = `
  pages {
    ... on ContentfulFaqPage {
      id
      slug
      pageHeading
      iconType
    }
  }
`;

const faqItem = `
  question
  answer {
    raw
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
  subheading {
    raw
  }
  resources {
    ... on ContentfulResourceItem {
      ${resourceItem}
    }
  }
`;

const globalNavigation = `
  allContentfulNavigation {
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

module.exports = {
  hero,
  seo,
  organisation,
  eventItem,
  eventsModule,
  slidingNavBlock,
  chipModule,
  faqNavigation,
  faqItem,
  resourceListModule,
  globalNavigation,
};
