const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getOrganisationPagePath } = require(`../helpers/hooks`);

const query = (graphql) => {
  return graphql(`
  {
    allContentfulOrganisation {
      edges {
        node {
          ${contentModel.organisation}
          node_locale
        }
      }
    }
  }
`);
};

const createOrganisationPages = (result, createPage) => {
  const organisationPages = result.data.allContentfulOrganisation.edges.map(
    (edge) => {
      return edge.node;
    }
  );

  organisationPages.forEach((organisationPage) => {
    const pagePath = getOrganisationPagePath(
      organisationPage?.name,
      organisationPage?.node_locale
    );

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/organisationPage.jsx`),
      context: {
        ...organisationPage,
      },
    });
  });
};

module.exports = {
  query,
  createOrganisationPages,
};
