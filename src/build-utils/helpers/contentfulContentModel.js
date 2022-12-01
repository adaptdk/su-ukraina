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

module.exports = {
  cta,
  hero,
  seo,
  organisation,
};
