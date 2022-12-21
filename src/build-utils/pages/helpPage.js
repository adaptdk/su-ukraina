const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getPathByLocale } = require(`../helpers/hooks`);
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
  const helpPages = result.data.allContentfulHelpPage.edges.map((edge) => {
    return edge.node;
  });
  const globalNavigation = result.data.allContentfulNavigation.edges.map(
    (edge) => {
      return edge.node;
    }
  );

  helpPages.forEach((helpPage) => {
    if (helpPage?.slug && helpPage?.node_locale) {
      const navigation = globalNavigation
        .filter((item) => {
          return item.node_locale === helpPage.node_locale;
        })
        .shift();

      const pagePath = getPathByLocale(helpPage?.node_locale, helpPage?.slug, {
        lt: `kaip-galiu-padeti`,
        ua: `help`,
      });

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/helpPage.jsx`),
        context: {
          ...helpPage,
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
