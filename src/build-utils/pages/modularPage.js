const path = require(`path`);
const {
  NAVIGATION_ID,
  PROMOLINE_ID,
} = require(`../../constants/contentfulIds`);

const {
  getPathByLocale,
  getAllPagesLocalisedValuesByKey,
} = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

const query = (graphql) => {
  return graphql(`
    {
      allContentfulModularPage {
        edges {
          node {
            contentful_id
            id
            slug
            node_locale
            metaTitle
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

  const allNodeSlugs = getAllPagesLocalisedValuesByKey(modularPages, `slug`);

  modularPages.forEach((modularPage) => {
    const slug = modularPage?.slug;
    const locale = modularPage?.node_locale;
    const id = modularPage?.contentful_id;

    if (slug && modularPage?.metaTitle && locale) {
      const currentNodeSlugs = allNodeSlugs[id];

      const pagePath = getPathByLocale(locale, slug);

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/modularPage.jsx`),
        context: {
          id,
          navigationId: NAVIGATION_ID,
          promoLineId: PROMOLINE_ID,
          locale,
          currentNodeSlugs,
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
