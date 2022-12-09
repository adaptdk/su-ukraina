const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getPathByLocale } = require(`../helpers/hooks`);

const query = (graphql) => {
  return graphql(`
  {
    allContentfulHelpPage {
      edges {
        node {
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
  helpPages.forEach((helpPage) => {
    const pagePath = getPathByLocale(helpPage?.node_locale, helpPage?.slug, {
      lt: `kaip-galiu-padeti`,
      ua: `help`,
    });

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/helpPage.jsx`),
      context: {
        ...helpPage,
      },
    });
  });
};

module.exports = {
  query,
  createHelpPages,
};
