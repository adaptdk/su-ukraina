const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getPathByLocale } = require(`../helpers/hooks`);

const query = (graphql) => {
  return graphql(`
  {
    ${contentModel.globalNavigation}
    allContentfulFaqPage(filter: { node_locale: { eq: "lt-LT" } }) {
      edges {
        node {
          contentful_id
          node_locale
          ${contentModel.pageData}
          ${contentModel.seo}
          ${contentModel.hero}
          forceTranslate
          categories {
            ... on ContentfulFaqCategory {
              ${contentModel.pageData}
              iconType
            }
          }
        }
      }
    }
  }
  `);
};

const createFaqIndexPages = (result, createPage) => {
  const faqIndexPages = result.data.allContentfulFaqPage.edges.map(
    (edge) => edge.node
  );
  const globalNavigation = result.data.allContentfulNavigation.edges.map(
    (edge) => edge.node
  );

  faqIndexPages.forEach((faqIndexPage) => {
    if (
      faqIndexPage?.slug &&
      faqIndexPage?.metaTitle &&
      faqIndexPage?.node_locale === `lt-LT`
    ) {
      const navigation = globalNavigation
        .filter((item) => item.node_locale === faqIndexPage.forceTranslate)
        .shift();

      const pagePath = getPathByLocale(
        faqIndexPage.forceTranslate,
        faqIndexPage.slug
      );

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/faqIndexPage.jsx`),
        context: {
          ...faqIndexPage,
          navigation,
          rootPath: pagePath,
        },
      });
    }
  });
};

module.exports = {
  query,
  createFaqIndexPages,
};
