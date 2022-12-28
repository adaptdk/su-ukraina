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

const partner = `
  id
  label
  url
  logo {
    gatsbyImageData(height: 80, placeholder: BLURRED, formats: WEBP)
  }
`;

const homepagePartners = `
  informationPartners {
    ... on ContentfulPartner {
      ${partner}
    }
  }
  contentPartners {
    ... on ContentfulPartner {
      ${partner}
    }
  }
  technologyPartners {
    ... on ContentfulPartner {
      ${partner}
    }
  }
  institutionPartners {
    ... on ContentfulPartner {
      ${partner}
    }
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

module.exports = {
  hero,
  seo,
  organisation,
  eventItem,
  eventsModule,
  slidingNavBlock,
  chipModule,
  faqItem,
  resourceListModule,
  partner,
  homepagePartners,
  globalNavigation,
  pageData,
};
