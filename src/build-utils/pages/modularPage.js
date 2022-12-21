const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getSlidingNavData, getPathByLocale } = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

const query = (graphql) => {
  return graphql(`
  {
    ${contentModel.globalNavigation}
    allContentfulModularPage {
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
          modules {
            ... on Node {
              id
              internal {
                type
              }
              ... on ContentfulEventsModule {
                ${contentModel.eventsModule}
              }
              ... on ContentfulSlidingNavBlock {
                ${contentModel.slidingNavBlock}
              }
              ... on ContentfulFaqNavigation {
                ${contentModel.faqNavigation}
              }
              ... on ContentfulResourceListModule {
                ${contentModel.resourceListModule}
              }
            }
          }
          includeContactForm
        }
      }
    }
  }
`);
};

const createModularPages = (result, createPage) => {
  const modularPages = result.data.allContentfulModularPage.edges.map(
    (edge) => {
      return edge.node;
    }
  );
  const globalNavigation = result.data.allContentfulNavigation.edges.map(
    (edge) => {
      return edge.node;
    }
  );

  modularPages.forEach((modularPage) => {
    if (modularPage?.slug && modularPage?.node_locale) {
      const navigation = globalNavigation
        .filter((item) => {
          return item.node_locale === modularPage.node_locale;
        })
        .shift();

      const slidingNavData = getSlidingNavData(modularPage.modules);
      const pagePath = getPathByLocale(
        modularPage?.node_locale,
        modularPage?.slug
      );

      const isHomepage =
        pagePath === `/` || pagePath === `ua` || pagePath === `en`;

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/modularPage.jsx`),
        context: {
          ...modularPage,
          navigation,
          slidingNavData,
          isHomepage,
        },
      });
    } else {
      logContentfulWarning(
        `Modular Page`,
        modularPage.contentful_id,
        modularPage.node_locale
      );
    }
  });
};

module.exports = {
  query,
  createModularPages,
};
