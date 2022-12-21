const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getFaqNavDataByLocale, getPathByLocale } = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

const query = (graphql) => {
  return graphql(`
  {
    allContentfulFaqPage {
      edges {
        node {
          contentful_id
          id
          slug
          node_locale
          ${contentModel.seo}
          ${contentModel.hero}
          pageHeading
          pageDescription {
            raw
          }
          iconType
          content {
            ... on Node {
              id
              internal {
                type
              }
              ... on ContentfulFaqItem {
                ${contentModel.faqItem}
              }
              ... on ContentfulResourceListModule {
                ${contentModel.resourceListModule}
              }
            }
          }
        }
      }
    }
  }
  `);
};

const createFaqPages = (result, createPage) => {
  const faqPages = result.data.allContentfulFaqPage.edges.map((edge) => {
    return edge.node;
  });

  // gather all the LT pages data
  const ltNavData = getFaqNavDataByLocale(faqPages, `lt-LT`);

  faqPages.forEach((faqPage) => {
    if (faqPage?.slug && faqPage?.node_locale) {
      const pagePath = getPathByLocale(faqPage?.node_locale, faqPage?.slug, {
        lt: `informacija-lietuviams`,
        ua: `refugee-guide`,
        en: `faq`,
      });

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/faqPage.jsx`),
        context: {
          ...faqPage,
          navData: faqPage.node_locale === `lt-LT` ? ltNavData : null,
        },
      });
    } else {
      logContentfulWarning(
        `FAQ Page`,
        faqPage.contentful_id,
        faqPage.node_locale
      );
    }
  });
};

module.exports = {
  query,
  createFaqPages,
};
