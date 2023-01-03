const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const {
  getSlidingNavData,
  getPathByLocale,
  getAllPagesLocalisedSlugs,
} = require(`../helpers/hooks`);
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
              ... on ContentfulResourceListModule {
                ${contentModel.resourceListModule}
              }
              ... on ContentfulLinkCollectionModule {
                ${contentModel.linkCollectionModule}
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
    (edge) => edge.node
  );
  const globalNavigation = result.data.allContentfulNavigation.edges.map(
    (edge) => edge.node
  );

  const allNodeSlugs = getAllPagesLocalisedSlugs(modularPages);

  modularPages.forEach((modularPage) => {
    if (
      modularPage?.slug &&
      modularPage?.metaTitle &&
      modularPage?.node_locale
    ) {
      const navigation = globalNavigation
        .filter((item) => item.node_locale === modularPage.node_locale)
        .shift();

      const currentNodeSlugs = allNodeSlugs[modularPage.contentful_id];

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
          currentNodeSlugs,
          navigation,
          slidingNavData,
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
