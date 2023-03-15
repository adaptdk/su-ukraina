const path = require(`path`);
const {
  NAVIGATION_ID,
  PROMOLINE_ID,
} = require(`../../constants/contentfulIds`);

const {
  getPathByLocale,
  getAllPagesLocalisedValuesByKey,
} = require(`../helpers/hooks`);
const {
  logContentfulWarning,
  HELP_PAGE_PREFIXES,
} = require(`../helpers/utils`);

const query = (graphql) => {
  return graphql(`
    {
      allContentfulHelpPage {
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

const createHelpPages = (result, createPage) => {
  const helpPages = result.data.allContentfulHelpPage.edges.map(
    (edge) => edge.node
  );

  const allNodeSlugs = getAllPagesLocalisedValuesByKey(helpPages, `slug`);

  helpPages.forEach((helpPage) => {
    const slug = helpPage?.slug;
    const locale = helpPage?.node_locale;
    const id = helpPage?.contentful_id;

    if (slug && helpPage?.metaTitle && locale) {
      const currentNodeSlugs = allNodeSlugs[id];

      const modifiedSlugs = Object.entries(currentNodeSlugs).reduce(
        (acc, [key, value]) => {
          const currentLocalePrefix = HELP_PAGE_PREFIXES[key];
          return { ...acc, [key]: `${currentLocalePrefix}/${value}` };
        },
        {}
      );

      const pagePath = getPathByLocale(locale, slug, HELP_PAGE_PREFIXES);

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/helpPage.jsx`),
        context: {
          id,
          navigationId: NAVIGATION_ID,
          promoLineId: PROMOLINE_ID,
          locale,
          currentNodeSlugs: modifiedSlugs,
        },
      });
    } else {
      logContentfulWarning(`Help Page`, id, locale);
    }
  });
};

module.exports = {
  query,
  createHelpPages,
};
