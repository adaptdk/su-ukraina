const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getFaqPagePath } = require(`../helpers/hooks`);

const query = (graphql) => {
  return graphql(`
  {
    ${contentModel.globalNavigation}
    allContentfulFaqPage {
      edges {
        node {
          contentful_id
          node_locale
          slug
          forceTranslate
          categories {
            ... on ContentfulFaqCategory {
              ${contentModel.pageData}
              iconType
              ${contentModel.seo}
              ${contentModel.hero}
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
    }
  }
  `);
};

const createFaqPages = (result, createPage) => {
  const faqPages = result.data.allContentfulFaqPage.edges.map(
    (edge) => edge.node
  );
  const globalNavigation = result.data.allContentfulNavigation.edges.map(
    (edge) => edge.node
  );

  faqPages.forEach((faqPage) => {
    if (faqPage?.slug && faqPage?.node_locale === `lt-LT`) {
      const navigation = globalNavigation
        .filter((item) => item.node_locale === faqPage.node_locale)
        .shift();

      const rootPath = getFaqPagePath(faqPage?.slug, faqPage?.forceTranslate);

      faqPage.categories.forEach((faqCategory) => {
        const categoryPath = `${rootPath}/${faqCategory.slug}`;

        createPage({
          path: categoryPath,
          component: path.resolve(`./src/templates/faqPage.jsx`),
          context: {
            ...faqCategory,
            categories: faqPage?.categories || [],
            navigation,
            rootPath,
          },
        });
      });
    }
  });
};

module.exports = {
  query,
  createFaqPages,
};
