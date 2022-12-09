const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getSlidingNavData, getPathByLocale } = require(`../helpers/hooks`);

const query = (graphql) => {
  return graphql(`
  {
    allContentfulModularPage {
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

  modularPages.forEach((modularPage) => {
    const slidingNavData = getSlidingNavData(modularPage.modules);
    const pagePath = getPathByLocale(
      modularPage?.node_locale,
      modularPage?.slug
    );

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/modularPage.jsx`),
      context: {
        ...modularPage,
        slidingNavData,
      },
    });
  });
};

module.exports = {
  query,
  createModularPages,
};
