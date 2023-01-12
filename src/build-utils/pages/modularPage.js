const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const {
  getSlidingNavData,
  getPathByLocale,
  getCurrentNodeValue,
  getAllPagesLocalisedValuesByKey,
} = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

const query = (graphql) => {
  return graphql(`
  {
    ${contentModel.globalNavigation}
    ${contentModel.promoLine}
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
              ... on ContentfulHelpSearchModule {
                ${contentModel.helpSearchModule}
              }
            }
          }
          includeContactForm
          fullWidthModules
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
  const globalPromoLine = result.data.allContentfulPromoLineModule.edges.map(
    (edge) => edge.node
  );

  const allNodeSlugs = getAllPagesLocalisedValuesByKey(modularPages, `slug`);
  const allHeroImages = getAllPagesLocalisedValuesByKey(
    modularPages,
    `heroImage`
  );

  modularPages.forEach((modularPage) => {
    const slug = modularPage?.slug;
    const locale = modularPage?.node_locale;
    const id = modularPage?.contentful_id;

    if (slug && modularPage?.metaTitle && locale) {
      const navigation = globalNavigation
        .filter((item) => item.node_locale === locale)
        .shift();
      const promoLine = globalPromoLine
        .filter((item) => item.node_locale === locale)
        .shift();

      const currentNodeSlugs = allNodeSlugs[id];
      const currentHeroImage = getCurrentNodeValue(allHeroImages, id, locale);

      const slidingNavData = getSlidingNavData(modularPage.modules);
      const pagePath = getPathByLocale(locale, slug);

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/modularPage.jsx`),
        context: {
          ...modularPage,
          heroImage: currentHeroImage,
          currentNodeSlugs,
          navigation,
          promoLine,
          slidingNavData,
        },
      });
    } else {
      logContentfulWarning(`Modular Page`, id, locale);
    }
  });
};

module.exports = {
  query,
  createModularPages,
};
