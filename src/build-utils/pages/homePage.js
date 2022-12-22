const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getHomePagePath } = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

const query = (graphql) => {
  return graphql(`
  {
    ${contentModel.globalNavigation}
    allContentfulHomepage(filter: {contentful_id: { eq: "VoE6QU1LhN2Y5h6Tja3fq" }}) {
      edges {
        node {
          id
          contentful_id
          node_locale
          ${contentModel.seo}
          heroTitle
          heroImage {
            gatsbyImageData(
              formats: WEBP
              height: 567
              width: 1440
              placeholder: BLURRED
              layout: FULL_WIDTH
            )
          }
          heroCtaCards {
            ... on ContentfulLinkIcon {
              id
              label
              url
              iconType
            }
          }
          mainSectionHeading
          mainSectionImage {
            gatsbyImageData(
              formats: WEBP
              height: 440
              width: 611
              placeholder: BLURRED
            )
          }
          mainSectionLinks {
            ... on ContentfulLink {
              id
              label
              url
            }
          }
          ${contentModel.homepagePartners}
        }
      }
    }
  }
`);
};

const createHomePages = (result, createPage) => {
  const homePages = result.data.allContentfulHomepage.edges.map((edge) => {
    return edge.node;
  });
  const globalNavigation = result.data.allContentfulNavigation.edges.map(
    (edge) => {
      return edge.node;
    }
  );

  homePages.forEach((homePage) => {
    if (homePage?.metaTitle && homePage?.node_locale) {
      const navigation = globalNavigation
        .filter((item) => {
          return item.node_locale === homePage.node_locale;
        })
        .shift();

      const pagePath = getHomePagePath(homePage.node_locale);

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/homePage.jsx`),
        context: {
          ...homePage,
          navigation,
        },
      });
    } else {
      logContentfulWarning(
        `Home Page`,
        homePage.contentful_id,
        homePage.node_locale
      );
    }
  });
};

module.exports = {
  query,
  createHomePages,
};
