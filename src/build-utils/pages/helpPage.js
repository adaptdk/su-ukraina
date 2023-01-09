const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
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
    ${contentModel.globalNavigation}
    allContentfulHelpPage {
      edges {
        node {
          contentful_id
          id
          slug
          node_locale
          slidingNav
          ${contentModel.seo}
          ${contentModel.hero}
          pageHeading
          pageDescription {
            raw
          }
          organisations {
            ... on ContentfulOrganisation {
              ${contentModel.organisation}
            }
          }
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
  const globalNavigation = result.data.allContentfulNavigation.edges.map(
    (edge) => edge.node
  );

  const allNodeSlugs = getAllPagesLocalisedValuesByKey(helpPages, `slug`);

  helpPages.forEach((helpPage) => {
    const slug = helpPage?.slug;
    const locale = helpPage?.node_locale;
    const id = helpPage?.contentful_id;

    if (slug && helpPage?.metaTitle && locale) {
      const navigation = globalNavigation
        .filter((item) => item.node_locale === locale)
        .shift();

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
          ...helpPage,
          currentNodeSlugs: modifiedSlugs,
          navigation,
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
