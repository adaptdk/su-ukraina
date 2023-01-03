const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const {
  getPathByLocale,
  getAllPagesLocalisedSlugs,
} = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

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

  const allNodeSlugs = getAllPagesLocalisedSlugs(helpPages);

  helpPages.forEach((helpPage) => {
    if (helpPage?.slug && helpPage?.metaTitle && helpPage?.node_locale) {
      const navigation = globalNavigation
        .filter((item) => item.node_locale === helpPage.node_locale)
        .shift();

      const currentNodeSlugs = allNodeSlugs[helpPage.contentful_id];

      const pagePath = getPathByLocale(helpPage?.node_locale, helpPage?.slug, {
        lt: `kaip-galiu-padeti`,
        ua: `help`,
      });

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/helpPage.jsx`),
        context: {
          ...helpPage,
          currentNodeSlugs,
          navigation,
        },
      });
    } else {
      logContentfulWarning(
        `Help Page`,
        helpPage.contentful_id,
        helpPage.node_locale
      );
    }
  });
};

module.exports = {
  query,
  createHelpPages,
};
