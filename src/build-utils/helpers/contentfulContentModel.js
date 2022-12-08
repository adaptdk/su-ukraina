const cta = `
  id
  label
  url
  isPrimary
`;

const hero = `
  hero {
    image {
      gatsbyImageData(height: 148, placeholder: BLURRED, formats: WEBP)
    }
  }
`;

const seo = `
  seo {
    pageTitle
    description
  }
`;

const organisation = `
  id
  name
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
  ctaList {
    ... on ContentfulCta {
      ${cta}
    }
  }
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

const linkIcon = `
  id
  iconType
  url
`;

const chip = `
  id
  heading
  subheading
  links {
    ... on ContentfulLinkIcon {
      ${linkIcon}
    }
  }
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
  cta {
    ${cta}
  }
`;

const resourceListModule = `
  heading
  resources {
    ... on ContentfulResourceItem {
      ${resourceItem}
    }
  }
`;

module.exports = {
  cta,
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
};
