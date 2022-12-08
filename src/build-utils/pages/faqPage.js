const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getFaqNavDataByLocale } = require(`../helpers/hooks`);

const query = (graphql) => {
  return graphql(`
  {
    allContentfulFaqPage {
      edges {
        node {
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
    const pathRoot =
      faqPage.node_locale === `lt-LT`
        ? `informacija-lietuviams/`
        : `ua/refugee-guide/`;
    createPage({
      path: `${pathRoot}${faqPage.slug}`,
      component: path.resolve(`./src/templates/faqPage.jsx`),
      context: {
        ...faqPage,
        navData: faqPage.node_locale === `lt-LT` ? ltNavData : null,
      },
    });
  });
};

module.exports = {
  query,
  createFaqPages,
};
